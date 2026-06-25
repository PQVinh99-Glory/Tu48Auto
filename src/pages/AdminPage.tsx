import { useState, useEffect } from "react";
import { Upload, Key, Save, AlertCircle, CheckCircle2, Trash2 } from "lucide-react";

interface CarItem {
  id: string;
  image: string;
  type: string;
}

export function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem("github_token") || "");
  const [file, setFile] = useState<File | null>(null);
  const [carsList, setCarsList] = useState<CarItem[]>([]);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const repoOwner = "PQVinh99-Glory";
  const repoName = "Tu48Auto";

  const handleSaveToken = () => {
    localStorage.setItem("github_token", token);
    alert("Đã lưu Token vào bộ nhớ trình duyệt!");
    fetchCars(); // Refresh list with new token
  };

  const fetchCars = async () => {
    if (!token) return;
    try {
      const jsonPath = "public/data/cars.json";
      const getJsonRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${jsonPath}`, {
        headers: { Authorization: `token ${token}` },
      });

      if (!getJsonRes.ok) return;

      const getJsonData = await getJsonRes.json();
      
      // Handle Base64 decoding safely
      const jsonText = decodeURIComponent(escape(atob(getJsonData.content)));
      setCarsList(JSON.parse(jsonText));
    } catch (error) {
      console.error("Lỗi khi tải danh sách xe:", error);
    }
  };

  // Load list on initial mount if token exists
  useEffect(() => {
    fetchCars();
  }, [token]);

  const handleUpload = async () => {
    if (!token || !file) {
      setStatus({ type: "error", message: "Vui lòng nhập Token và chọn một ảnh!" });
      return;
    }

    setStatus({ type: "loading", message: "Đang tải ảnh lên GitHub..." });

    try {
      // 1. Convert file to Base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Content = (reader.result as string).split(",")[1];

        // 2. Upload image to public/ folder
        const fileName = `${Date.now()}_${file.name}`;
        const imagePath = `public/${fileName}`;

        const uploadRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${imagePath}`, {
          method: "PUT",
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Upload new car image: ${fileName}`,
            content: base64Content,
          }),
        });

        if (!uploadRes.ok) throw new Error("Lỗi khi tải ảnh lên GitHub.");

        setStatus({ type: "loading", message: "Đang cập nhật danh sách xe..." });

        // 3. Get current cars.json (using fetchCars logic but we need fresh SHA)
        const jsonPath = "public/data/cars.json";
        const getJsonRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${jsonPath}`, {
          headers: { Authorization: `token ${token}`, "Cache-Control": "no-cache" },
        });

        if (!getJsonRes.ok) throw new Error("Lỗi khi đọc file cars.json từ GitHub.");

        const getJsonData = await getJsonRes.json();
        const jsonText = decodeURIComponent(escape(atob(getJsonData.content)));
        const currentCars = JSON.parse(jsonText);

        // 4. Update JSON data (Add new sub car to the end)
        currentCars.push({
          id: Date.now().toString(),
          image: fileName,
          type: "sub", // always 'sub' for newly added cars
        });

        // Use standard btoa with encodeURIComponent for utf-8 safety
        const newJsonContent = btoa(unescape(encodeURIComponent(JSON.stringify(currentCars, null, 2))));

        // 5. Update cars.json on GitHub
        const updateJsonRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${jsonPath}`, {
          method: "PUT",
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Add new car to gallery",
            content: newJsonContent,
            sha: getJsonData.sha,
          }),
        });

        if (!updateJsonRes.ok) throw new Error("Lỗi khi cập nhật danh sách (cars.json).");

        setStatus({
          type: "success",
          message: "Đã thêm xe thành công! Cloudflare đang tự động cập nhật web (khoảng 2 phút).",
        });
        setFile(null);
        fetchCars(); // Refresh the list
      };

      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error(error);
      setStatus({ type: "error", message: error.message || "Đã xảy ra lỗi không xác định." });
    }
  };

  const handleDelete = async (carId: string, imageFileName: string) => {
    if (!token) return alert("Vui lòng nhập Token trước!");
    if (!window.confirm("Bạn có chắc chắn muốn xóa ảnh này không? (Không thể hoàn tác)")) return;

    setStatus({ type: "loading", message: "Đang xóa ảnh..." });

    try {
      // 1. Lấy SHA mới nhất của file JSON
      const jsonPath = "public/data/cars.json";
      const getJsonRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${jsonPath}`, {
        headers: { Authorization: `token ${token}`, "Cache-Control": "no-cache" },
      });
      if (!getJsonRes.ok) throw new Error("Lỗi khi lấy dữ liệu JSON.");
      const getJsonData = await getJsonRes.json();
      
      const currentCars: CarItem[] = JSON.parse(decodeURIComponent(escape(atob(getJsonData.content))));
      
      // 2. Lọc bỏ xe cần xóa
      const updatedCars = currentCars.filter(c => c.id !== carId);
      const newJsonContent = btoa(unescape(encodeURIComponent(JSON.stringify(updatedCars, null, 2))));

      // 3. Cập nhật JSON
      const updateJsonRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${jsonPath}`, {
        method: "PUT",
        headers: { Authorization: `token ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Xóa ảnh xe: ${imageFileName}`,
          content: newJsonContent,
          sha: getJsonData.sha,
        }),
      });
      if (!updateJsonRes.ok) throw new Error("Lỗi khi cập nhật file JSON.");

      // 4. (Tùy chọn) Xóa luôn file ảnh thật trên GitHub để dọn dẹp dung lượng
      try {
        const imagePath = `public/${imageFileName}`;
        const getImageRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${imagePath}`, {
          headers: { Authorization: `token ${token}` },
        });
        if (getImageRes.ok) {
          const getImageData = await getImageRes.json();
          await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${imagePath}`, {
            method: "DELETE",
            headers: { Authorization: `token ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              message: `Xóa file vật lý: ${imageFileName}`,
              sha: getImageData.sha
            }),
          });
        }
      } catch (e) {
        console.warn("Không xóa được file vật lý trên GitHub, nhưng không sao vì đã gỡ khỏi giao diện.", e);
      }

      setStatus({ type: "success", message: "Đã xóa ảnh thành công! Web sẽ được cập nhật trong ít phút." });
      fetchCars(); // Refresh the list
    } catch (error: any) {
      console.error(error);
      setStatus({ type: "error", message: error.message || "Đã xảy ra lỗi." });
    }
  };

  return (
    <div className="min-h-screen bg-[#111] p-8 text-white">
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 shadow-2xl">
        <h1 className="mb-8 text-3xl font-bold uppercase tracking-wide text-orange-500 text-center">Quản Trị Thư Viện Xe</h1>

        {/* Token Section */}
        <div className="mb-8 rounded-xl bg-black/50 p-6">
          <label className="mb-2 flex items-center gap-2 text-sm text-gray-400">
            <Key className="h-4 w-4" />
            GitHub Personal Access Token
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="flex-1 rounded-lg border border-white/20 bg-transparent px-4 py-2 text-white outline-none focus:border-orange-500"
            />
            <button
              onClick={handleSaveToken}
              className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 transition hover:bg-white/20"
            >
              <Save className="h-4 w-4" />
              Lưu Token
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Token này dùng để kết nối trực tiếp với GitHub, không lưu trên bất kỳ server nào ngoài trình duyệt của bạn.
          </p>
        </div>

        {/* Main Grid: Upload on left, List on right (or stacked on small screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Upload Section */}
          <div className="rounded-xl border border-dashed border-white/20 p-8 text-center h-fit">
            <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium">Thêm ảnh xe mới</h3>
            <p className="mb-6 text-sm text-gray-400">Ảnh sẽ được thêm vào dưới dạng ảnh vệ tinh (sub) xung quanh ảnh chính.</p>
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mb-6 block w-full text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-orange-500/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-500 hover:file:bg-orange-500/20"
            />

            <button
              onClick={handleUpload}
              disabled={status.type === "loading" || !file || !token}
              className="w-full rounded-lg bg-orange-600 py-3 font-bold text-white transition hover:bg-orange-700 disabled:opacity-50"
            >
              {status.type === "loading" ? "Đang xử lý..." : "Tải ảnh lên hệ thống"}
            </button>
          </div>

          {/* List Section */}
          <div className="rounded-xl bg-black/30 p-6 border border-white/5">
            <h3 className="mb-4 text-lg font-medium border-b border-white/10 pb-2">Danh sách xe đang hiển thị</h3>
            {carsList.length === 0 ? (
              <p className="text-gray-500 text-sm">Chưa có dữ liệu hoặc chưa nhập Token hợp lệ.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {carsList.map((car) => (
                  <div key={car.id} className="flex items-center justify-between gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/20 transition">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {/* Bóc tách logic hiển thị ảnh: 
                          Trang Admin chạy locally hoặc live thì nó có thể tự đoán domain của trang landing page.
                          Tuy nhiên vì đang ở /quan-ly-xe, dùng đường dẫn tương đối ../ có thể bị lỗi, 
                          nên tôi sẽ dùng absolute / để load ảnh */}
                      <img 
                        src={`/${car.image}`} 
                        alt="Car Thumbnail" 
                        className="w-16 h-12 object-cover rounded-md bg-black"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x60?text=Wait+Deploy')}
                      />
                      <div className="text-sm">
                        <p className="text-gray-300 font-medium truncate w-32" title={car.image}>{car.image}</p>
                        <p className="text-xs text-gray-500">Loại: {car.type === 'main' ? 'Ảnh chính (Center)' : 'Ảnh phụ'}</p>
                      </div>
                    </div>
                    {/* Không cho xóa ảnh chính để tránh hỏng layout giữa, chỉ cho xóa ảnh phụ */}
                    {car.type !== 'main' && (
                      <button 
                        onClick={() => handleDelete(car.id, car.image)}
                        disabled={status.type === "loading"}
                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                        title="Xóa ảnh này"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status Message */}
        {status.message && (
          <div
            className={`mt-6 flex items-center gap-3 rounded-lg p-4 ${
              status.type === "success"
                ? "bg-green-500/10 text-green-500"
                : status.type === "error"
                ? "bg-red-500/10 text-red-500"
                : "bg-blue-500/10 text-blue-500"
            }`}
          >
            {status.type === "success" ? <CheckCircle2 className="h-5 w-5 flex-shrink-0" /> : <AlertCircle className="h-5 w-5 flex-shrink-0" />}
            <p className="text-sm">{status.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
