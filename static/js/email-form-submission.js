/**
 * Email 表單提交系統
 * 將表單數據通過 email 發送到指定信箱
 */

class EmailFormSubmission {
    constructor() {
        this.emailConfig = {
            to: 'flypig@icareu.tw',
            subject: 'FlyPig AI 業務洽詢表單',
            company: '艾可開發股份有限公司'
        };
    }

    async submitForm(formData) {
        try {
            console.log('📧 開始 Email 提交...');
            console.log('表單數據:', formData);
            
            // 生成 email 內容
            const emailContent = this.generateEmailContent(formData);
            console.log('📝 Email 內容:', emailContent);
            
            // 嘗試多種提交方式
            const results = await Promise.allSettled([
                this.submitViaMailto(emailContent),
                this.submitViaEmailJS(emailContent),
                this.showEmailInstructions(emailContent)
            ]);
            
            console.log('📊 提交結果:', results);
            
            // 檢查是否有任何方式成功
            const hasSuccess = results.some(result => 
                result.status === 'fulfilled' && result.value?.success
            );
            
            if (hasSuccess) {
                console.log('✅ Email 提交成功');
                return { success: true, method: 'email' };
            } else {
                console.log('⚠️ 所有 Email 方式都失敗，顯示備用方案');
                return { success: false, method: 'fallback' };
            }
            
        } catch (error) {
            console.error('❌ Email 提交錯誤:', error);
            throw error;
        }
    }

    generateEmailContent(formData) {
        const timestamp = new Date().toLocaleString('zh-TW');
        const sourceUrl = window.location.href;
        
        const emailBody = `
FlyPig AI 業務洽詢表單提交

公司名稱：${formData.companyName || ''}
聯絡人姓名：${formData.contactPerson || ''}
電子信箱：${formData.email || ''}
聯絡電話：${formData.phone || ''}

感興趣的服務：
${Array.isArray(formData.services) ? formData.services.join('\n- ') : formData.services || ''}

預算範圍：${formData.budget || ''}
期望完成時間：${formData.timeline || ''}

詳細需求描述：
${formData.requirements || ''}

---
提交時間：${timestamp}
來源網址：${sourceUrl}
提交者 IP：${this.getClientIP()}

此郵件由 FlyPig AI 網站表單自動生成
`;

        return {
            to: this.emailConfig.to,
            subject: `${this.emailConfig.subject} - ${formData.companyName || '未知公司'}`,
            body: emailBody.trim()
        };
    }

    async submitViaMailto(emailContent) {
        try {
            console.log('📧 嘗試 Mailto 方式...');
            
            // 編碼 email 內容
            const encodedSubject = encodeURIComponent(emailContent.subject);
            const encodedBody = encodeURIComponent(emailContent.body);
            
            const mailtoUrl = `mailto:${emailContent.to}?subject=${encodedSubject}&body=${encodedBody}`;
            
            // 嘗試打開 mailto 連結
            window.open(mailtoUrl, '_blank');
            
            console.log('✅ Mailto 連結已開啟');
            return { success: true, method: 'mailto' };
            
        } catch (error) {
            console.error('❌ Mailto 失敗:', error);
            return { success: false, method: 'mailto', error: error.message };
        }
    }

    async submitViaEmailJS(emailContent) {
        try {
            console.log('📧 嘗試 EmailJS 方式...');
            
            // 檢查是否載入了 EmailJS
            if (typeof emailjs === 'undefined') {
                console.log('⚠️ EmailJS 未載入，跳過此方式');
                return { success: false, method: 'emailjs', error: 'EmailJS not loaded' };
            }
            
            // 使用 EmailJS 發送
            const templateParams = {
                to_email: emailContent.to,
                subject: emailContent.subject,
                message: emailContent.body,
                from_name: 'FlyPig AI Website',
                reply_to: 'noreply@flypigai.com'
            };
            
            const result = await emailjs.send(
                'service_id', // 需要設定
                'template_id', // 需要設定
                templateParams
            );
            
            console.log('✅ EmailJS 發送成功:', result);
            return { success: true, method: 'emailjs', result };
            
        } catch (error) {
            console.error('❌ EmailJS 失敗:', error);
            return { success: false, method: 'emailjs', error: error.message };
        }
    }

    async showEmailInstructions(emailContent) {
        try {
            console.log('📧 顯示 Email 指示...');
            
            // 顯示複製 Email 內容的指示
            this.showEmailCopyInstructions(emailContent);
            
            return { success: true, method: 'instructions' };
            
        } catch (error) {
            console.error('❌ 顯示指示失敗:', error);
            return { success: false, method: 'instructions', error: error.message };
        }
    }

    showEmailCopyInstructions(emailContent) {
        const instructionsHtml = `
            <div class="email-instructions" style="
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                font-family: Arial, sans-serif;
            ">
                <h4 style="color: #495057; margin-bottom: 15px;">
                    <i class="fas fa-envelope me-2"></i>Email 提交指示
                </h4>
                
                <div style="margin-bottom: 15px;">
                    <strong>收件人：</strong> ${emailContent.to}
                </div>
                
                <div style="margin-bottom: 15px;">
                    <strong>主旨：</strong> ${emailContent.subject}
                </div>
                
                <div style="margin-bottom: 15px;">
                    <strong>內容：</strong>
                    <div style="
                        background: white;
                        border: 1px solid #ced4da;
                        border-radius: 4px;
                        padding: 10px;
                        margin-top: 5px;
                        font-family: monospace;
                        white-space: pre-wrap;
                        max-height: 200px;
                        overflow-y: auto;
                    ">${emailContent.body}</div>
                </div>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="copyEmailContent()" class="btn btn-primary btn-sm">
                        <i class="fas fa-copy me-1"></i>複製內容
                    </button>
                    <a href="mailto:${emailContent.to}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}" 
                       class="btn btn-success btn-sm">
                        <i class="fas fa-envelope me-1"></i>開啟郵件客戶端
                    </a>
                    <button onclick="closeEmailInstructions()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times me-1"></i>關閉
                    </button>
                </div>
            </div>
        `;
        
        // 顯示指示
        const container = document.getElementById('emailInstructionsContainer') || 
                         this.createEmailInstructionsContainer();
        container.innerHTML = instructionsHtml;
        container.style.display = 'block';
        
        // 儲存 email 內容到全域變數
        window.emailContent = emailContent;
    }

    createEmailInstructionsContainer() {
        const container = document.createElement('div');
        container.id = 'emailInstructionsContainer';
        container.style.display = 'none';
        
        // 插入到表單容器中
        const formContainer = document.querySelector('.contact-form-container') || 
                             document.querySelector('#enhanced-contact-form-container') ||
                             document.body;
        formContainer.appendChild(container);
        
        return container;
    }

    getClientIP() {
        // 嘗試獲取客戶端 IP（簡化版）
        return '無法獲取';
    }
}

// 全域函數
window.copyEmailContent = function() {
    if (window.emailContent) {
        const emailText = `收件人: ${window.emailContent.to}\n主旨: ${window.emailContent.subject}\n\n${window.emailContent.body}`;
        
        navigator.clipboard.writeText(emailText).then(() => {
            alert('Email 內容已複製到剪貼簿！');
        }).catch(err => {
            // 備用方案
            const textArea = document.createElement('textarea');
            textArea.value = emailText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Email 內容已複製到剪貼簿！');
        });
    }
};

window.closeEmailInstructions = function() {
    const container = document.getElementById('emailInstructionsContainer');
    if (container) {
        container.style.display = 'none';
    }
};

// 創建全域實例
window.emailFormSubmitter = new EmailFormSubmission();

console.log('📧 Email 表單提交系統已載入');
console.log('使用方法: window.emailFormSubmitter.submitForm(formData)');
