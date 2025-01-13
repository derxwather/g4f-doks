document.addEventListener('DOMContentLoaded', () => {
    const settingsToggle = document.querySelector('.settings-toggle');
    const colorPanel = document.querySelector('.color-panel');
    
    if (settingsToggle && colorPanel) {
        // Открытие/закрытие панели настроек
        settingsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            colorPanel.classList.toggle('active');
        });

        // Закрытие при клике вне панели
        document.addEventListener('click', (e) => {
            if (!colorPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
                colorPanel.classList.remove('active');
            }
        });

        // Предотвращаем закрытие при клике на панель
        colorPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Применение цветов
        const applyColors = document.querySelector('.apply-colors');
        if (applyColors) {
            applyColors.addEventListener('click', () => {
                // Получаем все color-picker'ы
                const colorPickers = document.querySelectorAll('.color-picker');
                const colors = {};

                colorPickers.forEach(picker => {
                    const colorType = picker.dataset.color;
                    colors[colorType] = picker.value;
                    document.documentElement.style.setProperty(`--${colorType}-color`, picker.value);
                });

                // Получаем значения range слайдеров
                const radiusSlider = document.querySelector('[data-style="radius"]');
                const borderWidthSlider = document.querySelector('[data-style="border-width"]');

                if (radiusSlider) {
                    document.documentElement.style.setProperty('--border-radius', `${radiusSlider.value}px`);
                    colors.radius = radiusSlider.value;
                }

                if (borderWidthSlider) {
                    document.documentElement.style.setProperty('--border-width', `${borderWidthSlider.value}px`);
                    colors.borderWidth = borderWidthSlider.value;
                }

                // Сохраняем в localStorage
                localStorage.setItem('widget-colors', JSON.stringify(colors));
                colorPanel.classList.remove('active');
            });
        }

        // Обработка пресетов
        const presetButtons = document.querySelectorAll('.preset-btn');
        const presets = {
            default: {
                primary: '#6200ee',
                secondary: '#03dac6',
                background: '#ffffff',
                text: '#000000',
                button: '#6200ee',
                'button-text': '#ffffff',
                input: '#ffffff',
                'input-text': '#000000',
                border: '#e0e0e0',
                radius: '12',
                borderWidth: '2'
            },
            dark: {
                primary: '#bb86fc',
                secondary: '#03dac6',
                background: '#121212',
                text: '#ffffff',
                button: '#bb86fc',
                'button-text': '#000000',
                input: '#1e1e1e',
                'input-text': '#ffffff',
                border: '#2d2d2d',
                radius: '8',
                borderWidth: '2'
            },
            light: {
                primary: '#1976d2',
                secondary: '#26a69a',
                background: '#f5f5f5',
                text: '#212121',
                button: '#1976d2',
                'button-text': '#ffffff',
                input: '#ffffff',
                'input-text': '#212121',
                border: '#e0e0e0',
                radius: '4',
                borderWidth: '1'
            },
            colorful: {
                primary: '#ff4081',
                secondary: '#00bcd4',
                background: '#ffffff',
                text: '#212121',
                button: '#ff4081',
                'button-text': '#ffffff',
                input: '#ffffff',
                'input-text': '#212121',
                border: '#ff4081',
                radius: '16',
                borderWidth: '2'
            }
        };

        presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const presetName = btn.dataset.preset;
                const preset = presets[presetName];

                if (preset) {
                    // Применяем цвета из пресета
                    Object.entries(preset).forEach(([key, value]) => {
                        if (key === 'radius' || key === 'borderWidth') {
                            document.documentElement.style.setProperty(
                                `--${key === 'radius' ? 'border-radius' : 'border-width'}`,
                                `${value}px`
                            );
                            const slider = document.querySelector(`[data-style="${key === 'radius' ? 'radius' : 'border-width'}"]`);
                            if (slider) {
                                slider.value = value;
                                slider.nextElementSibling.textContent = `${value}px`;
                            }
                        } else {
                            document.documentElement.style.setProperty(`--${key}-color`, value);
                            const picker = document.querySelector(`.color-picker[data-color="${key}"]`);
                            if (picker) picker.value = value;
                        }
                    });
                }
            });
        });

        // Обновление значений range слайдеров
        const rangeSliders = document.querySelectorAll('.range-slider');
        rangeSliders.forEach(slider => {
            slider.addEventListener('input', () => {
                slider.nextElementSibling.textContent = `${slider.value}px`;
            });
        });

        // Загрузка сохраненных цветов
        const savedColors = localStorage.getItem('widget-colors');
        if (savedColors) {
            const colors = JSON.parse(savedColors);
            Object.entries(colors).forEach(([key, value]) => {
                if (key === 'radius') {
                    document.documentElement.style.setProperty('--border-radius', `${value}px`);
                    const slider = document.querySelector('[data-style="radius"]');
                    if (slider) {
                        slider.value = value;
                        slider.nextElementSibling.textContent = `${value}px`;
                    }
                } else if (key === 'borderWidth') {
                    document.documentElement.style.setProperty('--border-width', `${value}px`);
                    const slider = document.querySelector('[data-style="border-width"]');
                    if (slider) {
                        slider.value = value;
                        slider.nextElementSibling.textContent = `${value}px`;
                    }
                } else {
                    document.documentElement.style.setProperty(`--${key}-color`, value);
                    const picker = document.querySelector(`.color-picker[data-color="${key}"]`);
                    if (picker) picker.value = value;
                }
            });
        }
    }
});