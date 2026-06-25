import { useState } from "react";
import { Upload, Key, Save, AlertCircle, CheckCircle2 } from "lucide-react";

export function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem("github_token") || "");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const repoOwner = "PQVinh99-Glory";
  const repoName = "Tu48Auto";

  const handleSaveToken = () => {
    localStorage.setItem("github_token", token);
    alert("Đã lưu Token vào bộ nhớ trình duyệt!");
  };

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

        // 3. Get current cars.json
        const jsonPath = "public/data/cars.json";
        const getJsonRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${jsonPath}`, {
          headers: { Authorization: `token ${token}` },
        });

        if (!getJsonRes.ok) throw new Error("Lỗi khi đọc file cars.json từ GitHub.");

        const getJsonData = await getJsonRes.json();
        const currentCars = JSON.parse(atob(getJsonData.content));

        // 4. Update JSON data (Add new sub car to the end)
        currentCars.push({
          id: Date.now().toString(),
          image: fileName,
          type: "sub",
        });

        const newJsonContent = btoa(JSON.stringify(currentCars, null, 2));

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
      };

      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error(error);
      setStatus({ type: "error", message: error.message || "Đã xảy ra lỗi không xác định." });
    }
  };

  return (
    <div className="min-h-screen bg-[#111] p-8 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 shadow-2xl">
        <h1 className="mb-8 text-3xl font-bold uppercase tracking-wide text-orange-500">Quản Trị Thư Viện Xe</h1>

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

        {/* Upload Section */}
        <div className="rounded-xl border border-dashed border-white/20 p-8 text-center">
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
            {status.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <p>{status.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
