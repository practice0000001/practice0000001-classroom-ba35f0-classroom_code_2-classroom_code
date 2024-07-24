async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/upload", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    alert("File uploaded successfully");
  } else {
    alert("File upload failed");
  }
}
