'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

type Template = 'simple' | 'traditional'

interface ContentSection {
  id: number
  title: string
  content: string
}

export default function CreatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('simple')
  const [title, setTitle] = useState('怎样才能达到有钱又有闲?建立自己的致富杠杆。')
  const [subtitle, setSubtitle] = useState('觉察, 生长, 自洽。')
  const [sections, setSections] = useState<ContentSection[]>([
    { id: 1, title: '', content: '传统模式:收入=时间*时薪' },
    { id: 2, title: '', content: '杠杆模式:收入=产品价格*用户数' },
    { id: 3, title: '', content: '建立自己的致富杠杆，需要从思维模式开始转变。' },
  ])
  const [wordCount, setWordCount] = useState(1699)
  const [autoSaveTime, setAutoSaveTime] = useState('11:27')
  const previewScrollRef = useRef<HTMLDivElement>(null)
  const [isDraggingPreview, setIsDraggingPreview] = useState(false)
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 })

  // 计算总字数
  useEffect(() => {
    const totalWords = title.length + subtitle.length + 
      sections.reduce((sum, section) => sum + section.title.length + section.content.length, 0)
    setWordCount(totalWords)
  }, [title, subtitle, sections])

  // 更新自动保存时间
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setAutoSaveTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`)
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // 预览区域滚动处理
  const handlePreviewScroll = (e: React.WheelEvent) => {
    if (previewScrollRef.current) {
      e.preventDefault()
      previewScrollRef.current.scrollLeft += e.deltaY
    }
  }

  const scrollPreview = (direction: 'left' | 'right') => {
    if (previewScrollRef.current) {
      const scrollAmount = 320 // 300px width + 20px gap
      previewScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // 鼠标拖动预览区域
  const handlePreviewMouseDown = (e: React.MouseEvent) => {
    if (previewScrollRef.current) {
      setIsDraggingPreview(true)
      dragStartRef.current = {
        x: e.pageX - previewScrollRef.current.offsetLeft,
        scrollLeft: previewScrollRef.current.scrollLeft
      }
    }
  }

  const handlePreviewMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPreview || !previewScrollRef.current) return
    e.preventDefault()
    const x = e.pageX - previewScrollRef.current.offsetLeft
    const walk = (x - dragStartRef.current.x) * 2
    previewScrollRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk
  }

  const handlePreviewMouseUp = () => {
    setIsDraggingPreview(false)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingPreview || !previewScrollRef.current) return
      e.preventDefault()
      const rect = previewScrollRef.current.getBoundingClientRect()
      const x = e.pageX - rect.left
      const walk = (x - dragStartRef.current.x) * 2
      previewScrollRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk
    }

    const handleMouseUp = () => {
      setIsDraggingPreview(false)
    }

    if (isDraggingPreview) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingPreview])

  const updateSection = (id: number, field: 'title' | 'content', value: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ))
  }

  const addSection = () => {
    const newId = Math.max(...sections.map(s => s.id), 0) + 1
    setSections([...sections, { id: newId, title: '', content: '' }])
  }

  const deleteSection = (id: number) => {
    setSections(sections.filter(section => section.id !== id))
  }

  // 模板样式
  const templateStyles = {
    simple: {
      contentBg: 'bg-white',
      sectionBg: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-900',
      accentColor: 'text-blue-600',
    },
    traditional: {
      contentBg: 'bg-gradient-to-br from-blue-50 to-purple-50',
      sectionBg: 'bg-white',
      borderColor: 'border-blue-300',
      textColor: 'text-gray-800',
      accentColor: 'text-purple-600',
    },
  }

  const currentStyle = templateStyles[selectedTemplate]

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="text-gray-700 hover:text-gray-900">预览</button>
          <button className="text-gray-700 hover:text-gray-900">选择模板</button>
          <button className="text-gray-700 hover:text-gray-900">封面设置</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Content Panel */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className={`max-w-3xl mx-auto ${currentStyle.contentBg} rounded-lg p-8 shadow-sm`}>
            {/* Title */}
            <div className="mb-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full text-3xl font-bold mb-2 ${currentStyle.textColor} bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 -mx-2`}
                placeholder="输入标题..."
              />
            </div>

            {/* Subtitle */}
            <div className="mb-8">
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className={`w-full text-lg ${currentStyle.textColor} bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 -mx-2 opacity-70`}
                placeholder="输入副标题..."
              />
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div key={section.id} className={`${currentStyle.sectionBg} rounded-lg p-6 border ${currentStyle.borderColor}`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${currentStyle.accentColor} bg-opacity-10 flex items-center justify-center font-bold text-lg`}>
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        className={`w-full font-semibold mb-2 ${currentStyle.textColor} bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 -mx-2`}
                        placeholder="章节标题（可选）..."
                      />
                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                        className={`w-full min-h-[100px] ${currentStyle.textColor} bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 -mx-2 resize-none`}
                        placeholder="输入内容..."
                      />
                    </div>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Section Button */}
            <button
              onClick={addSection}
              className="mt-6 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              + 添加章节
            </button>
          </div>
        </div>

        {/* Right Template Panel */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-6">
          <h3 className="font-semibold text-gray-900 mb-4">模板选择</h3>
          
          {/* Template Options */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setSelectedTemplate('simple')}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedTemplate === 'simple'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">简约基础</span>
                {selectedTemplate === 'simple' && (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">简洁清爽的排版风格</p>
            </button>

            <button
              onClick={() => setSelectedTemplate('traditional')}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedTemplate === 'traditional'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">传统模式</span>
                {selectedTemplate === 'traditional' && (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">经典传统的排版风格</p>
            </button>
          </div>

          {/* Template Cards */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 mb-3">推荐模板</h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h5 className="font-semibold text-gray-900 mb-1">古董店奇遇真相记,不应该发生的案件后续。</h5>
              <p className="text-sm text-gray-600">悬疑推理风格</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h5 className="font-semibold text-gray-900 mb-1">如何从濒临破产到行业独角兽</h5>
              <p className="text-sm text-gray-600">商业案例风格</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600 font-medium">拖动滑块快速定位</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollPreview('left')}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollPreview('right')}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Horizontal Scrollable Preview Area - 小红书图文比例 3:4 */}
        <div
          ref={previewScrollRef}
          onWheel={handlePreviewScroll}
          onMouseDown={handlePreviewMouseDown}
          onMouseMove={handlePreviewMouseMove}
          onMouseUp={handlePreviewMouseUp}
          onMouseLeave={handlePreviewMouseUp}
          className={`flex gap-4 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide ${isDraggingPreview ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* 生成多个预览卡片，每个章节一个 */}
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="flex-shrink-0 relative"
              style={{
                width: '300px',
                height: '400px',
                aspectRatio: '3/4',
              }}
            >
              <div className={`w-full h-full ${currentStyle.contentBg} rounded-lg shadow-lg p-6 overflow-hidden flex flex-col`}>
                {/* 标题 */}
                <h2 className={`text-xl font-bold ${currentStyle.textColor} mb-2 line-clamp-2`}>
                  {title || '标题'}
                </h2>
                
                {/* 副标题 */}
                {subtitle && (
                  <p className={`text-sm ${currentStyle.textColor} opacity-70 mb-4 line-clamp-1`}>
                    {subtitle}
                  </p>
                )}
                
                {/* 章节编号 */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${currentStyle.accentColor} bg-opacity-10 flex items-center justify-center font-bold text-base mb-4`}>
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                
                {/* 章节内容 */}
                <div className={`flex-1 ${currentStyle.sectionBg} rounded-lg p-4 border ${currentStyle.borderColor} overflow-y-auto`}>
                  {section.title && (
                    <h3 className={`font-semibold ${currentStyle.textColor} mb-2`}>
                      {section.title}
                    </h3>
                  )}
                  <p className={`text-sm ${currentStyle.textColor} leading-relaxed`}>
                    {section.content || '内容预览...'}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* 如果没有章节，显示一个默认预览 */}
          {sections.length === 0 && (
            <div
              className="flex-shrink-0 relative"
              style={{
                width: '300px',
                height: '400px',
                aspectRatio: '3/4',
              }}
            >
              <div className={`w-full h-full ${currentStyle.contentBg} rounded-lg shadow-lg p-6 overflow-hidden flex flex-col items-center justify-center`}>
                <p className={`text-gray-400 ${currentStyle.textColor}`}>暂无内容</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-end gap-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          下一步
        </button>
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          暂存离开
        </button>
        <div className="text-sm text-gray-600">
          字数: {wordCount}
        </div>
        <div className="text-sm text-gray-500">
          自动保存于 {autoSaveTime}
        </div>
      </div>
    </div>
  )
}

