document.addEventListener('DOMContentLoaded', () => {
    // Переключение тем
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    // Загружаем сохраненную тему
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeButtons.forEach(btn => {
            if (btn.dataset.theme === savedTheme) {
                btn.style.background = 'rgba(255, 255, 255, 0.4)';
            }
        });
    }

    // Обработчик переключения тем
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            
            // Убираем выделение со всех кнопок
            themeButtons.forEach(btn => {
                btn.style.background = 'rgba(255, 255, 255, 0.2)';
            });
            
            // Выделяем активную кнопку
            button.style.background = 'rgba(255, 255, 255, 0.4)';
            
            // Применяем тему
            body.setAttribute('data-theme', theme);
            
            // Сохраняем выбор
            localStorage.setItem('selected-theme', theme);
        });
    });

    // Функционал для кнопки "Показать код"
    const widgets = document.querySelectorAll('.widget');
    
    widgets.forEach(widget => {
        const showCodeBtn = widget.querySelector('.show-code-btn');
        const codePreview = widget.querySelector('.code-preview');
        
        if (showCodeBtn && codePreview) {
            showCodeBtn.addEventListener('click', () => {
                // Получаем текущую тему
                const currentTheme = document.body.getAttribute('data-theme') || 'material-you';
                
                // Клонируем виджет для получения его HTML
                const widgetClone = widget.cloneNode(true);
                
                // Удаляем кнопку "Показать код" и предпросмотр кода из клона
                const btnToRemove = widgetClone.querySelector('.show-code-btn');
                const previewToRemove = widgetClone.querySelector('.code-preview');
                if (btnToRemove) btnToRemove.remove();
                if (previewToRemove) previewToRemove.remove();
                
                // Добавляем атрибут темы
                widgetClone.setAttribute('data-theme', currentTheme);
                
                // Получаем HTML код виджета
                let widgetCode = widgetClone.outerHTML;
                
                // Форматируем код для красивого отображения
                widgetCode = widgetCode
                    .replace(/></g, '>\n<')
                    .replace(/^/gm, '    ');
                
                // Обновляем содержимое предпросмотра
                const previewCode = codePreview.querySelector('.preview-code');
                if (previewCode) {
                    previewCode.textContent = widgetCode;
                }
                
                // Показываем предпросмотр
                codePreview.style.display = 'block';
            });
        }
    });

    // Копирование кода виджета
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.closest('.code-preview').querySelector('.preview-code');
            navigator.clipboard.writeText(codeBlock.textContent)
                .then(() => {
                    button.textContent = 'Скопировано!';
                    setTimeout(() => {
                        button.textContent = 'Копировать';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Ошибка копирования:', err);
                    button.textContent = 'Ошибка';
                    setTimeout(() => {
                        button.textContent = 'Копировать';
                    }, 2000);
                });
        });
    });
}); 