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
        // 這裡可以整合實際的後端 API
        // 目前使用模擬延遲
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 模擬成功回應
        console.log('表單數據:', data);
        
        // 在實際應用中，這裡會發送數據到後端
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        
        // if (!response.ok) {
        //     throw new Error('提交失敗');
        // }
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
