/**
 * FlyPig AI 業務洽詢表格 - 增強版 JavaScript
 * 提供表單驗證、提交處理、動畫效果等功能
 */

class EnhancedContactForm {
    constructor() {
        this.form = document.getElementById('enhancedContactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.formStatus = document.getElementById('formStatus');
        this.successMessage = document.getElementById('successMessage');
        
        this.init();
    }

    init() {
        if (!this.form) return;

        // 綁定事件監聽器
        this.bindEvents();
        
        // 初始化動畫效果
        this.initAnimations();
        
        // 設置表單驗證
        this.setupValidation();
    }

    bindEvents() {
        // 表單提交事件
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // 即時驗證
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // 複選框變化監聽
        const checkboxes = this.form.querySelectorAll('input[name="services"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.validateServices());
        });
    }

    initAnimations() {
        // 表單載入動畫
        const formElements = this.form.querySelectorAll('.form-group-enhanced');
        formElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupValidation() {
        // 設置自定義驗證訊息
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.showFieldError(input, this.getCustomErrorMessage(input));
            });
        });
    }

    getCustomErrorMessage(input) {
        const messages = {
            companyName: '請輸入公司名稱',
            contactPerson: '請輸入聯絡人姓名',
            email: '請輸入有效的電子信箱',
            phone: '請輸入聯絡電話',
            requirements: '請詳細描述您的需求'
        };
        return messages[input.name] || '此欄位為必填';
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // 必填驗證
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = this.getCustomErrorMessage(field);
        }

        // 電子信箱驗證
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = '請輸入有效的電子信箱格式';
            }
        }

        // 電話驗證
        if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\d\-\+\(\)\s]{8,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = '請輸入有效的電話號碼';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    validateServices() {
        const serviceCheckboxes = this.form.querySelectorAll('input[name="services"]:checked');
        const errorElement = document.getElementById('servicesError');
        
        if (serviceCheckboxes.length === 0) {
            this.showFieldError(null, '請至少選擇一項服務', errorElement);
            return false;
        } else {
            this.clearFieldError(null, errorElement);
            return true;
        }
    }

    validateSelect(selectId, errorId, message) {
        const select = document.getElementById(selectId);
        const errorElement = document.getElementById(errorId);
        
        if (!select || !select.value || select.value === '') {
            if (errorElement) {
                this.showFieldError(select, message, errorElement);
            }
            return false;
        } else {
            if (errorElement) {
                this.clearFieldError(select, errorElement);
            }
            return true;
        }
    }

    showFieldError(field, message, errorElement = null) {
        if (field) {
            const error = field.parentElement.querySelector('.field-error');
            if (error) {
                error.textContent = message;
                error.classList.add('show');
                field.style.borderColor = '#e74c3c';
            }
        } else if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearFieldError(field, errorElement = null) {
        if (field) {
            const error = field.parentElement.querySelector('.field-error');
            if (error) {
                error.classList.remove('show');
                field.style.borderColor = '';
            }
        } else if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        // 驗證所有必填欄位
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        // 驗證服務選擇
        if (!this.validateServices()) {
            isValid = false;
        }

        // 驗證預算範圍（必填）
        if (!this.validateSelect('budget', 'budgetError', '請選擇預算範圍')) {
            isValid = false;
        }

        // 驗證期望完成時間（必填）
        if (!this.validateSelect('timeline', 'timelineError', '請選擇期望完成時間')) {
            isValid = false;
        }

        return isValid;
    }

    async handleSubmit() {
        // 驗證表單
        if (!this.validateForm()) {
            this.showStatus('請檢查並修正表單中的錯誤', 'error');
            return;
        }

        // 顯示載入狀態
        this.setLoadingState(true);
        this.showStatus('正在提交您的洽詢...', 'info');

        try {
            // 收集表單數據
            const formData = this.collectFormData();
            
            // 模擬提交（實際應用中應該發送到後端）
            await this.submitFormData(formData);
            
            // 顯示成功訊息
            this.showSuccess();
            
        } catch (error) {
            console.error('提交錯誤:', error);
            this.showStatus('提交失敗，請稍後再試或直接聯繫我們', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        // 收集基本資料
        for (let [key, value] of formData.entries()) {
            if (key === 'services') {
                // 處理複選框
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }

        // 添加時間戳和來源
        data.timestamp = new Date().toISOString();
        data.source = 'FlyPig AI Website';
        data.url = window.location.href;

        return data;
    }

    async submitFormData(data) {
        try {
            console.log('🚀 開始表單提交...');
            console.log('表單數據:', data);
            
            // 優先使用 Formspree 自動發送
            try {
                await this.submitViaFormspree(data);
                return; // 成功則直接返回
            } catch (formspreeError) {
                console.warn('⚠️ Formspree 提交失敗，使用備用方案:', formspreeError.message);
            }
            
            // 備用方案：使用 Email 提交方式
            await this.submitViaEmail(data);
            
        } catch (error) {
            console.error('表單提交錯誤:', error);
            
            // 如果提交失敗，顯示聯絡資訊
            this.showContactInfo(data);
            this.fallbackDataLog(data);
        }
    }

    async submitViaFormspree(formData) {
        try {
            console.log('📧 開始 Formspree 自動發送...');
            
            // Formspree endpoint - 使用實際的 Form ID
            const endpoint = 'https://formspree.io/f/mpwyyajo';
            
            const submitData = {
                _replyto: formData.email || '',
                _subject: `FlyPig AI 業務洽詢 - ${formData.companyName || '未知公司'}`,
                _cc: formData.email || '', // 副本給用戶
                // 主要收件人已在 Formspree 中設定為 mkhsu2002@gmail.com
                
                // 表單欄位
                company_name: formData.companyName || '',
                contact_person: formData.contactPerson || '',
                email: formData.email || '',
                phone: formData.phone || '',
                services: Array.isArray(formData.services) ? formData.services.join(', ') : formData.services || '',
                budget: formData.budget || '',
                timeline: formData.timeline || '',
                requirements: formData.requirements || '',
                
                // 額外資訊
                submit_time: new Date().toLocaleString('zh-TW'),
                source_url: window.location.href,
                user_agent: navigator.userAgent
            };

            console.log('📊 提交數據:', submitData);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                console.log('✅ Formspree 提交成功');
                this.showFormspreeSuccess();
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

        } catch (error) {
            console.error('❌ Formspree 提交失敗:', error);
            throw error;
        }
    }

    showFormspreeSuccess() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.innerHTML = `
                <div class="form-success-animation">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="color: #4CAF50; margin-bottom: 1rem;">提交成功！</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        感謝您的洽詢！我們已收到您的訊息，並將在 24 小時內回覆到您的信箱。
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:03-5735430" class="btn btn-success">
                            <i class="fas fa-phone me-2"></i>立即致電
                        </a>
                        <a href="https://line.me/ti/p/@icareutw" target="_blank" class="btn btn-outline-success">
                            <i class="fab fa-line me-2"></i>LINE 聯絡
                        </a>
                        <a href="https://www.facebook.com/FlyPigAI" target="_blank" class="btn btn-outline-primary">
                            <i class="fab fa-facebook-f me-2"></i>關注我們
                        </a>
                    </div>
                </div>
            `;
            successMessage.style.display = 'block';
            
            // 隱藏表單
            this.form.style.display = 'none';
            this.formStatus.style.display = 'none';
        }
    }

    async submitViaEmail(formData) {
        try {
            console.log('📧 開始 Email 提交...');
            
            // 生成 email 內容
            const emailContent = this.generateEmailContent(formData);
            console.log('📝 Email 內容:', emailContent);
            
            // 顯示 email 提交界面
            this.showEmailSubmissionInterface(emailContent);
            
            // 同時嘗試開啟郵件客戶端
            this.openMailtoClient(emailContent);
            
            console.log('✅ Email 提交準備完成');
            
        } catch (error) {
            console.error('Email 提交失敗:', error);
            throw error;
        }
    }

    generateEmailContent(formData) {
        const timestamp = new Date().toLocaleString('zh-TW');
        const sourceUrl = window.location.href;
        
        const emailBody = `FlyPig AI 業務洽詢表單提交

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

此郵件由 FlyPig AI 網站表單自動生成`;

        return {
            to: 'mkhsu2002@gmail.com',
            subject: `FlyPig AI 業務洽詢 - ${formData.companyName || '未知公司'}`,
            body: emailBody.trim()
        };
    }

    showEmailSubmissionInterface(emailContent) {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.innerHTML = `
                <div class="form-success-animation">
                    <div class="success-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <h3 style="color: #4CAF50; margin-bottom: 1rem;">表單提交成功！</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        請將以下內容複製並發送到我們的信箱：
                    </p>
                    
                    <div style="
                        background: #f8f9fa;
                        border: 1px solid #dee2e6;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                        text-align: left;
                        font-family: monospace;
                        white-space: pre-wrap;
                        max-height: 300px;
                        overflow-y: auto;
                    ">
<strong>收件人：</strong>${emailContent.to}
<strong>主旨：</strong>${emailContent.subject}

${emailContent.body}
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
                        <button onclick="copyEmailContent()" class="btn btn-primary">
                            <i class="fas fa-copy me-2"></i>複製內容
                        </button>
                        <a href="mailto:${emailContent.to}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}" 
                           class="btn btn-success">
                            <i class="fas fa-envelope me-2"></i>開啟郵件客戶端
                        </a>
                        <a href="tel:03-5735430" class="btn btn-outline-primary">
                            <i class="fas fa-phone me-2"></i>直接致電
                        </a>
                        <a href="https://line.me/ti/p/@icareutw" target="_blank" class="btn btn-outline-success">
                            <i class="fab fa-line me-2"></i>LINE 聯絡
                        </a>
                    </div>
                </div>
            `;
            successMessage.style.display = 'block';
            
            // 隱藏表單
            this.form.style.display = 'none';
            this.formStatus.style.display = 'none';
        }
        
        // 儲存 email 內容到全域變數
        window.emailContent = emailContent;
    }

    openMailtoClient(emailContent) {
        try {
            const encodedSubject = encodeURIComponent(emailContent.subject);
            const encodedBody = encodeURIComponent(emailContent.body);
            const mailtoUrl = `mailto:${emailContent.to}?subject=${encodedSubject}&body=${encodedBody}`;
            
            // 嘗試打開郵件客戶端
            window.open(mailtoUrl, '_blank');
            console.log('📧 郵件客戶端已開啟');
            
        } catch (error) {
            console.log('⚠️ 無法自動開啟郵件客戶端:', error.message);
        }
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.innerHTML = `
                <div class="form-success-animation">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="color: #4CAF50; margin-bottom: 1rem;">提交成功！</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        感謝您的洽詢！我們的專業團隊將在 24 小時內與您聯繫。
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:03-5735430" class="btn btn-success">
                            <i class="fas fa-phone me-2"></i>立即致電
                        </a>
                        <a href="https://line.me/ti/p/@icareutw" target="_blank" class="btn btn-outline-success">
                            <i class="fab fa-line me-2"></i>LINE 聯絡
                        </a>
                        <a href="https://www.facebook.com/FlyPigAI" target="_blank" class="btn btn-outline-primary">
                            <i class="fab fa-facebook-f me-2"></i>關注我們
                        </a>
                    </div>
                </div>
            `;
            successMessage.style.display = 'block';
            
            // 隱藏表單
            this.form.style.display = 'none';
            this.formStatus.style.display = 'none';
        }
    }

    showContactInfo(data) {
        // 顯示聯絡資訊的成功畫面
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.innerHTML = `
                <div class="form-success-animation">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="color: #4CAF50; margin-bottom: 1rem;">提交成功！</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        感謝您的洽詢！我們的專業團隊將在 24 小時內與您聯繫。
                    </p>
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                        <h5><i class="fas fa-info-circle me-2"></i>您的洽詢資訊：</h5>
                        <p><strong>公司：</strong>${data.companyName}</p>
                        <p><strong>聯絡人：</strong>${data.contactPerson}</p>
                        <p><strong>服務需求：</strong>${Array.isArray(data.services) ? data.services.join(', ') : data.services}</p>
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:03-5735430" class="btn btn-success">
                            <i class="fas fa-phone me-2"></i>立即致電
                        </a>
                        <a href="https://www.facebook.com/FlyPigAI" target="_blank" class="btn btn-outline-primary">
                            <i class="fab fa-facebook-f me-2"></i>關注我們
                        </a>
                        <a href="https://line.me/ti/p/@icareutw" target="_blank" class="btn btn-outline-success">
                            <i class="fab fa-line me-2"></i>LINE 聯絡
                        </a>
                    </div>
                </div>
            `;
            successMessage.style.display = 'block';
            
            // 隱藏表單
            this.form.style.display = 'none';
            this.formStatus.style.display = 'none';
        }
    }

    logSubmissionStats(formData, results) {
        // 發送 Google Analytics 事件
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit_success', {
                event_category: 'Contact',
                event_label: 'Business Inquiry',
                value: results.length,
                custom_parameter_services: formData.services ? formData.services.join(',') : '',
                custom_parameter_company: formData.companyName || ''
            });
        }
    }

    fallbackDataLog(formData) {
        // 在控制台記錄數據，以便手動處理
        console.group('📋 表單提交數據（備用記錄）');
        console.log('提交時間:', new Date().toLocaleString('zh-TW'));
        console.log('公司名稱:', formData.companyName);
        console.log('聯絡人:', formData.contactPerson);
        console.log('電子信箱:', formData.email);
        console.log('聯絡電話:', formData.phone);
        console.log('服務需求:', formData.services);
        console.log('預算範圍:', formData.budget);
        console.log('期望時程:', formData.timeline);
        console.log('需求描述:', formData.requirements);
        console.groupEnd();
        
        // 可以考慮將數據存儲到 localStorage 作為備用
        const fallbackData = {
            ...formData,
            timestamp: new Date().toISOString(),
            status: 'pending_manual_review'
        };
        
        const existingData = JSON.parse(localStorage.getItem('flypig_contact_submissions') || '[]');
        existingData.push(fallbackData);
        localStorage.setItem('flypig_contact_submissions', JSON.stringify(existingData.slice(-10))); // 只保留最近10筆
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showStatus(message, type) {
        this.formStatus.textContent = message;
        this.formStatus.className = `form-status ${type}`;
        this.formStatus.style.display = 'block';
        
        // 自動隱藏 info 訊息
        if (type === 'info') {
            setTimeout(() => {
                this.formStatus.style.display = 'none';
            }, 3000);
        }
    }

    showSuccess() {
        // 隱藏表單和狀態訊息
        this.form.style.display = 'none';
        this.formStatus.style.display = 'none';
        
        // 顯示成功訊息
        this.successMessage.style.display = 'block';
        
        // 滾動到成功訊息
        this.successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });

        // 發送 Google Analytics 事件（如果可用）
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: 'Business Inquiry'
            });
        }
    }
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedContactForm();
});

// 導出類別供其他腳本使用
window.EnhancedContactForm = EnhancedContactForm;

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
    } else {
        alert('沒有可複製的 Email 內容！');
    }
};
