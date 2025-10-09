#!/usr/bin/env python3
"""
更新 Google Forms ID 腳本
用於將網站中的舊 Google Forms ID 替換為新的 ID
"""

import re
import os
import sys

def update_google_forms_id(old_id, new_id):
    """更新所有檔案中的 Google Forms ID"""
    
    # 要更新的檔案列表
    files_to_update = [
        'index.html',
        'admin-dashboard.html', 
        'static/js/form-backend-integration.js',
        'templates/index.html'
    ]
    
    updated_files = []
    
    for file_path in files_to_update:
        if not os.path.exists(file_path):
            print(f"⚠️  檔案不存在: {file_path}")
            continue
            
        try:
            # 讀取檔案內容
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 替換舊的 ID
            original_content = content
            content = content.replace(old_id, new_id)
            
            # 檢查是否有變更
            if content != original_content:
                # 寫回檔案
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files.append(file_path)
                print(f"✅ 已更新: {file_path}")
            else:
                print(f"ℹ️  無需更新: {file_path}")
                
        except Exception as e:
            print(f"❌ 更新失敗 {file_path}: {e}")
    
    return updated_files

def generate_new_links(form_id):
    """生成新的 Google Forms 連結"""
    links = {
        'form_url': f'https://docs.google.com/forms/d/{form_id}/viewform',
        'responses_url': f'https://docs.google.com/forms/d/{form_id}/responses', 
        'embed_url': f'https://docs.google.com/forms/d/{form_id}/viewform?embedded=true',
        'edit_url': f'https://docs.google.com/forms/d/{form_id}/edit'
    }
    return links

def main():
    """主函數"""
    print("🔧 Google Forms ID 更新工具")
    print("=" * 50)
    
    # 舊的 Google Forms ID
    old_id = "1nJAbLO50ySDfgodx_SYP3xB-aFzHPcY-Kthaoki67XQ"
    
    # 從命令列參數獲取新的 ID，或提示用戶輸入
    if len(sys.argv) > 1:
        new_id = sys.argv[1]
    else:
        new_id = input("請輸入新的 Google Forms ID: ").strip()
    
    if not new_id:
        print("❌ 錯誤：未提供新的表單 ID")
        return
    
    print(f"📝 舊 ID: {old_id}")
    print(f"📝 新 ID: {new_id}")
    print()
    
    # 確認更新
    confirm = input("確認要更新所有檔案嗎？(y/N): ").strip().lower()
    if confirm not in ['y', 'yes', '是']:
        print("❌ 取消更新")
        return
    
    # 執行更新
    print("\n🔄 開始更新檔案...")
    updated_files = update_google_forms_id(old_id, new_id)
    
    # 顯示結果
    print(f"\n📊 更新完成！")
    print(f"✅ 已更新 {len(updated_files)} 個檔案")
    
    if updated_files:
        print("\n📁 更新的檔案:")
        for file_path in updated_files:
            print(f"   - {file_path}")
    
    # 生成新的連結
    print(f"\n🔗 新的 Google Forms 連結:")
    links = generate_new_links(new_id)
    print(f"📋 表單連結: {links['form_url']}")
    print(f"📊 回應頁面: {links['responses_url']}")
    print(f"⚙️  編輯頁面: {links['edit_url']}")
    print(f"🔗 嵌入連結: {links['embed_url']}")
    
    print(f"\n🎉 更新完成！請記得提交變更到 Git。")

if __name__ == '__main__':
    main()
