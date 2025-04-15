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
            
            // Google 表單提交 URL
            // 使用您提供的表單 ID
            const googleFormId = '1nJAbLO50ySDfgodx_SYP3xB-aFzHPcY-Kthaoki67XQ';
            const googleFormURL = `https://docs.google.com/forms/d/${googleFormId}/formResponse`;
            
            // 這些是 Google 表單中的欄位名稱，需要檢查您的表單並調整
            // 以下使用常見的 entry.XXXXXX 格式，您需要根據實際情況調整
            const formParams = new URLSearchParams();
            formParams.append('entry.1234567890', name); // 姓名欄位，需替換為實際的欄位 ID
            formParams.append('entry.1234567891', email); // 郵件欄位，需替換為實際的欄位 ID
            formParams.append('entry.1234567892', company); // 公司名稱欄位，需替換為實際的欄位 ID
            formParams.append('entry.1234567893', phone); // 電話欄位，需替換為實際的欄位 ID
            formParams.append('entry.1234567894', service); // 服務需求欄位，需替換為實際的欄位 ID
            formParams.append('entry.1234567895', message); // 訊息內容欄位，需替換為實際的欄位 ID
            
            // 使用 fetch 提交表單數據
            fetch(googleFormURL, {
                method: 'POST',
                mode: 'no-cors', // 此模式不會拋出 CORS 錯誤
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formParams.toString()
            })
            .then(response => {
                // 由於 no-cors 模式，無法檢查實際響應內容
                // 視為成功，清空表單
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
            })
            .catch(error => {
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
            });
        });
    }
});
