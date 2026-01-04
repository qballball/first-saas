'use client'

import { useState } from 'react'

type Style = 'Gaming' | 'Tutorial' | 'Vlog'

export default function Home() {
  const [videoTitle, setVideoTitle] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<Style>('Gaming')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [importUrl, setImportUrl] = useState('')

  const handleGenerate = () => {
    if (!videoTitle.trim()) {
      alert('请输入视频标题')
      return
    }
    // TODO: 实现生成逻辑
    console.log('生成缩略图:', { videoTitle, style: selectedStyle })
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsProcessing(false)
    setImportUrl('')
  }

  const handleImport = () => {
    if (!importUrl.trim()) {
      alert('请输入链接')
      return
    }
    setIsProcessing(true)
    // TODO: 实现导入逻辑
    setTimeout(() => {
      setIsProcessing(false)
      handleCloseModal()
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Create Click-Worthy YouTube
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Thumbnails in 3 Seconds
            </span>
          </h1>
          <p className="text-xl text-gray-600 mt-6">
            使用 AI 快速生成吸引眼球的 YouTube 缩略图
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* Video Title Input */}
          <div className="mb-8">
            <label htmlFor="video-title" className="block text-sm font-semibold text-gray-700 mb-3">
              视频标题
            </label>
            <input
              id="video-title"
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="输入你的视频标题..."
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all text-lg"
            />
          </div>

          {/* Style Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              选择风格
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['Gaming', 'Tutorial', 'Vlog'] as Style[]).map((style) => (
                <label
                  key={style}
                  className={`relative flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedStyle === style
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="style"
                    value={style}
                    checked={selectedStyle === style}
                    onChange={() => setSelectedStyle(style)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className={`text-2xl mb-2 ${selectedStyle === style ? 'text-purple-600' : 'text-gray-400'}`}>
                      {style === 'Gaming' && '🎮'}
                      {style === 'Tutorial' && '📚'}
                      {style === 'Vlog' && '📹'}
                    </div>
                    <span className={`font-semibold ${selectedStyle === style ? 'text-purple-700' : 'text-gray-700'}`}>
                      {style}
                    </span>
                  </div>
                  {selectedStyle === style && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!videoTitle.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            生成缩略图
          </button>
        </div>

        {/* Test Modal Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleOpenModal}
            className="text-purple-600 hover:text-purple-700 underline"
          >
            打开导入链接弹窗
          </button>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">极速生成</h3>
            <p className="text-gray-600 text-sm">3 秒内生成专业缩略图</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-900 mb-2">多种风格</h3>
            <p className="text-gray-600 text-sm">适配不同视频类型</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-semibold text-gray-900 mb-2">高质量</h3>
            <p className="text-gray-600 text-sm">AI 驱动的专业设计</p>
          </div>
        </div>
      </div>

      {/* Modal with 50% opacity overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 50% opacity overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">导入链接</h2>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-700 text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    // TODO: 实现查看公众号关联列表
                  }}
                >
                  查看公众号关联列表
                </a>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Input Field */}
              <input
                type="text"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="https://mp.weixin.qq.com/s/F8pZyexDffeTalGgc5HmZg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />

              {/* Status Message and Buttons */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-gray-500 text-sm">
                  预计耗时 30 秒, 请耐心等待
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={!importUrl.trim() || isProcessing}
                    className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isProcessing && (
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {isProcessing ? '排版中' : '导入'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}