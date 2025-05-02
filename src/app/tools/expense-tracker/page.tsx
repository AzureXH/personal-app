"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  imageUrl?: string;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [recognizedAmount, setRecognizedAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 调用图像识别API
  const recognizeAmountFromImage = async (file: File): Promise<number> => {
    setIsUploading(true);
    
    try {
      // 将图片转换为base64格式
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      
      // 调用API端点
      const response = await fetch('/api/recognize-amount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });
      
      if (!response.ok) {
        throw new Error('识别请求失败');
      }
      
      const data = await response.json();
      setIsUploading(false);
      return data.amount;
    } catch (error) {
      console.error('图像识别错误:', error);
      setIsUploading(false);
      // 出错时返回默认值
      return 0;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 创建预览
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // 识别金额
    const amount = await recognizeAmountFromImage(file);
    setRecognizedAmount(amount);
  };

  const handleAddExpense = () => {
    if (recognizedAmount === null) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: recognizedAmount,
      description: description || "未命名支出",
      date: new Date().toISOString().split("T")[0],
      imageUrl: previewImage || undefined,
    };

    setExpenses([newExpense, ...expenses]);
    setRecognizedAmount(null);
    setDescription("");
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        智能记账
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          添加新支出
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            上传收据或发票图片
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
              />
            </div>
            {isUploading && (
              <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                识别中...
              </div>
            )}
          </div>
        </div>

        {previewImage && (
          <div className="mb-6">
            <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <Image
                src={previewImage}
                alt="Receipt preview"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        )}

        {recognizedAmount !== null && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              识别到的金额
            </label>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                ¥{recognizedAmount.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                (可以手动修改)
              </span>
            </div>
            <input
              type="number"
              value={recognizedAmount}
              onChange={(e) => setRecognizedAmount(parseFloat(e.target.value))}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              step="0.01"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            描述
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例如：午餐、超市购物等"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          onClick={handleAddExpense}
          disabled={recognizedAmount === null}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          添加支出
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          支出记录
        </h2>

        {expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            暂无支出记录，请添加您的第一笔支出
          </div>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                {expense.imageUrl && (
                  <div className="flex-shrink-0 mr-4">
                    <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                      <Image
                        src={expense.imageUrl}
                        alt="Receipt"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {expense.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {expense.date}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ¥{expense.amount.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          注意：当前版本使用的是模拟的图像识别功能。在实际应用中，我们将集成真实的OCR
          API来提供更准确的识别结果。
        </p>
      </div>
    </div>
  );
}