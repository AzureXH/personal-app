import { NextRequest, NextResponse } from "next/server";

// 模拟OCR图像识别处理
async function processImage(base64Image: string): Promise<number> {
  // 在实际应用中，这里应该调用真实的OCR API服务
  // 例如：Google Cloud Vision API, Azure Computer Vision, Tesseract.js等
  console.log("base64Image", base64Image);
  // 模拟处理延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 返回模拟的识别结果（随机金额）
  return parseFloat((Math.random() * 1000).toFixed(2));
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.image) {
      return NextResponse.json({ error: "未提供图像数据" }, { status: 400 });
    }

    // 从base64编码的图像中提取数据部分
    const base64Image = data.image.split(",")[1] || data.image;

    // 处理图像并识别金额
    const recognizedAmount = await processImage(base64Image);

    return NextResponse.json({
      success: true,
      amount: recognizedAmount,
    });
  } catch (error) {
    console.error("图像识别错误:", error);
    return NextResponse.json({ error: "处理图像时出错" }, { status: 500 });
  }
}
