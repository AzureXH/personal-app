import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
          个人工具集
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300">
          实用工具集合，提高您的工作效率
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
          <Link href="/tools/expense-tracker" className="group">
            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  智能记账
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                通过图像识别自动提取收据和发票中的金额，轻松记录您的支出
              </p>
            </div>
          </Link>
          
          {/* 预留位置，未来可添加更多工具 */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm h-full flex flex-col opacity-60">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-400">
                即将推出
              </h2>
            </div>
            <p className="text-gray-400">
              更多实用工具正在开发中...
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} 个人工具集 | 基于 Next.js 和 Vercel 构建</p>
      </footer>
    </div>
  );
}
