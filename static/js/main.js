// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar color change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 處理自定義聯絡表單的提交
    const contactForm = document.getElementById('customContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formStatus = document.getElementById('formStatus');
            
            // 顯示載入中訊息
            formStatus.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">載入中...</span></div> 請稍候...';
            formStatus.className = '';
            
            // 獲取表單數據
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company') || '未提供';
            const phone = formData.get('phone') || '未提供';
            const service = formData.get('service');
            const message = formData.get('message');
            
            // 使用表單的短網址直接提交
            const googleFormURL = 'https://forms.gle/8n1x3JSfPHzy2MAYA';
            
            // 為了確保與 Google 表單的兼容性，我們使用表單重定向提交方法
            // 創建一個隱藏的表單元素
            const hiddenForm = document.createElement('form');
            hiddenForm.method = 'POST';
            hiddenForm.action = googleFormURL;
            hiddenForm.target = '_blank'; // 在新標籤頁中打開以避免頁面跳轉
            hiddenForm.style.display = 'none';
            
            // 創建並添加表單欄位
            // 欄位映射 (假設欄位名稱在 Google 表單中的順序)
            const fieldMappings = [
                { name: 'entry.1', value: name }, // 姓名
                { name: 'entry.2', value: email }, // 電子郵件
                { name: 'entry.3', value: company }, // 公司名稱
                { name: 'entry.4', value: phone }, // 電話
                { name: 'entry.5', value: service }, // 服務需求
                { name: 'entry.6', value: message } // 訊息內容
            ];
            
            // 添加所有可能的欄位，確保至少一個能正確映射
            // 這是一種通用的方法，確保表單能提交
            fieldMappings.forEach(field => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = field.name;
                input.value = field.value;
                hiddenForm.appendChild(input);
            });
            
            // 同時以標準命名慣例添加欄位
            const inputs = [
                { name: 'name', value: name },
                { name: 'email', value: email },
                { name: 'company', value: company },
                { name: 'phone', value: phone },
                { name: 'service', value: service },
                { name: 'message', value: message }
            ];
            
            inputs.forEach(input => {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = input.name;
                hiddenInput.value = input.value;
                hiddenForm.appendChild(hiddenInput);
            });
            
            // 添加表單到文檔
            document.body.appendChild(hiddenForm);
            
            try {
                // 通過 iframe 提交表單，避免頁面跳轉
                const iframe = document.createElement('iframe');
                iframe.name = 'hidden_iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                
                // 更新表單目標
                hiddenForm.target = 'hidden_iframe';
                
                // 提交表單
                hiddenForm.submit();
                
                // 提交成功後清理
                setTimeout(() => {
                    document.body.removeChild(hiddenForm);
                    document.body.removeChild(iframe);
                }, 1000);
                
                // 清空原表單
                contactForm.reset();
                
                // 更新表單狀態
                formStatus.innerHTML = '感謝您的訊息！我們將盡快回覆您。';
                formStatus.className = 'success mt-3 text-center p-3';
                
                // 顯示 Toast 通知
                const toastEl = document.getElementById('formToast');
                const toastMessage = document.getElementById('toastMessage');
                if (toastEl && toastMessage) {
                    toastMessage.textContent = '感謝您的訊息！我們將盡快回覆您。';
                    const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
                    toast.show();
                }
                
                // 5秒後清除表單狀態提示
                setTimeout(() => {
                    formStatus.innerHTML = '';
                    formStatus.className = 'mt-3 text-center';
                }, 5000);
            } catch (error) {
                // 發生錯誤
                console.error('提交表單時出錯:', error);
                
                // 更新表單狀態
                formStatus.innerHTML = '發送訊息時出錯，請稍後再試或直接聯繫我們。';
                formStatus.className = 'error mt-3 text-center p-3';
                
                // 顯示錯誤 Toast 通知
                const toastEl = document.getElementById('formToast');
                const toastMessage = document.getElementById('toastMessage');
                if (toastEl && toastMessage) {
                    toastMessage.textContent = '發送訊息時出錯，請稍後再試或直接聯繫我們。';
                    toastEl.classList.add('bg-danger', 'text-white');
                    const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
                    toast.show();
                    
                    // Toast 關閉後恢復原樣式
                    toastEl.addEventListener('hidden.bs.toast', function () {
                        toastEl.classList.remove('bg-danger', 'text-white');
                    }, { once: true });
                }
                
                // 清理表單和 iframe
                if (document.body.contains(hiddenForm)) {
                    document.body.removeChild(hiddenForm);
                }
                const iframe = document.querySelector('iframe[name="hidden_iframe"]');
                if (iframe) {
                    document.body.removeChild(iframe);
                }
            }
        });
    }
});
