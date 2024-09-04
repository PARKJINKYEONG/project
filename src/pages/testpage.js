import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import useRequest from "../hooks/useRequest";

export function TestPage() {
  const { post } = useRequest();
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();

    // FormData에 이미지를 추가
    selectedImages.forEach((image) => {
      data.append("files", image);
    });

    // FormData에 기타 데이터 추가
    data.append("imageType", event.target.imageType.value);
    data.append("dirName", event.target.dirName.value);

    try {
      const resp = await post("/api/image/postImage", data, {
        skipAuth: true,
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type 설정 생략 가능
        },
      });

      console.log(resp.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="imageType"
          label="이미지 타입(영어로, DB에 저장되는거임)"
          name="imageType"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="dirName"
          label="폴더이름"
          id="dirName"
        />

        {/* 이미지 업로드 버튼 */}
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          이미지 선택
          <input
            type="file"
            hidden
            accept="image/*"
            multiple // 여러 이미지 선택 가능
            onChange={handleImageChange}
          />
        </Button>

        {/* 업로드된 이미지 미리보기 */}
        {previewUrls.length > 0 && (
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`미리보기 ${index + 1}`}
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            ))}
          </Box>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          업로드
        </Button>
      </Box>
    </>
  );
}
