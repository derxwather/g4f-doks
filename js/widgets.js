// Создаем и добавляем виджеты на страницу
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.widgets-container');

    // Виджет часов
    const clockWidget = createWidget('clock', 'Часы', `
        <div class="widget-clock">
            <div class="time">00:00:00</div>
            <div class="date">01 января 2024</div>
        </div>
    `);
    
    // Виджет таймера
    const timerWidget = createWidget('timer', 'Таймер', `
        <div class="widget-timer">
            <div class="display">00:00:00</div>
            <div class="controls">
                <input type="number" class="hours" placeholder="Ч" min="0" max="23">
                <input type="number" class="minutes" placeholder="М" min="0" max="59">
                <input type="number" class="seconds" placeholder="С" min="0" max="59">
            </div>
            <div class="buttons">
                <button class="start">Старт</button>
                <button class="stop">Стоп</button>
                <button class="reset">Сброс</button>
            </div>
        </div>
    `);

    // Виджет секундомера
    const stopwatchWidget = createWidget('stopwatch', 'Секундомер', `
        <div class="widget-stopwatch">
            <div class="display">00:00:00</div>
            <div class="buttons">
                <button class="start">Старт</button>
                <button class="stop">Стоп</button>
                <button class="reset">Сброс</button>
            </div>
            <div class="laps"></div>
        </div>
    `);

    // Виджет календаря
    const calendarWidget = createWidget('calendar', 'Календарь', `
        <div class="widget-calendar">
            <div class="calendar-header">
                <button class="prev-month">&lt;</button>
                <div class="current-month">Январь 2024</div>
                <button class="next-month">&gt;</button>
            </div>
            <div class="weekdays">
                <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div>
                <div>Пт</div><div>Сб</div><div>Вс</div>
            </div>
            <div class="calendar-grid"></div>
        </div>
    `);

    // Виджет погоды
    const weatherWidget = createWidget('weather', 'Погода', `
        <div class="widget-weather">
            <div class="weather-search">
                <input type="text" placeholder="Введите город" class="city-input">
                <button class="search-btn">Поиск</button>
            </div>
            <div class="weather-info">
                <div class="weather-main">
                    <div class="temperature">--°C</div>
                    <div class="weather-description">--</div>
                </div>
                <div class="weather-details">
                    <div class="humidity">Влажность: --%</div>
                    <div class="wind">Ветер: -- м/с</div>
                </div>
            </div>
        </div>
    `);

    // Виджет калькулятора
    const calculatorWidget = createWidget('calculator', 'Калькулятор', `
        <div class="widget-calculator">
            <input type="text" class="calc-display" readonly value="0">
            <div class="calc-buttons">
                <button class="calc-btn" data-type="clear">C</button>
                <button class="calc-btn" data-type="operator">(</button>
                <button class="calc-btn" data-type="operator">)</button>
                <button class="calc-btn" data-type="operator">/</button>
                <button class="calc-btn" data-type="number">7</button>
                <button class="calc-btn" data-type="number">8</button>
                <button class="calc-btn" data-type="number">9</button>
                <button class="calc-btn" data-type="operator">*</button>
                <button class="calc-btn" data-type="number">4</button>
                <button class="calc-btn" data-type="number">5</button>
                <button class="calc-btn" data-type="number">6</button>
                <button class="calc-btn" data-type="operator">-</button>
                <button class="calc-btn" data-type="number">1</button>
                <button class="calc-btn" data-type="number">2</button>
                <button class="calc-btn" data-type="number">3</button>
                <button class="calc-btn" data-type="operator">+</button>
                <button class="calc-btn" data-type="number">0</button>
                <button class="calc-btn" data-type="number">.</button>
                <button class="calc-btn" data-type="operator">%</button>
                <button class="calc-btn" data-type="equals">=</button>
            </div>
        </div>
    `);

    // Виджет заметок
    const notesWidget = createWidget('notes', 'Заметки', `
        <div class="widget-notes">
            <div class="notes-list"></div>
            <div class="notes-input">
                <input type="text" placeholder="Новая заметка" class="note-text">
                <button class="add-note">+</button>
            </div>
        </div>
    `);

    // Виджет списка задач
    const todoWidget = createWidget('todo', 'Список задач', `
        <div class="widget-todo">
            <div class="todo-list"></div>
            <div class="todo-input">
                <input type="text" placeholder="Новая задача" class="todo-text">
                <button class="add-todo">Добавить</button>
            </div>
        </div>
    `);

    // Виджет цитат
    const quoteWidget = createWidget('quote', 'Цитата дня', `
        <div class="widget-quote">
            <div class="quote-text"></div>
            <div class="quote-author"></div>
            <button class="new-quote">Новая цитата</button>
        </div>
    `);

    // Виджет обратного отсчета до даты
    function initCountdownWidget() {
        const widget = createWidget('countdown', 'Обратный отсчет', `
            <div class="countdown-input">
                <input type="datetime-local" id="countdown-date" class="date-input">
                <button class="start-countdown">Начать отсчет</button>
            </div>
            <div class="countdown-display">
                <div class="countdown-item">
                    <span class="days">00</span>
                    <label>Дней</label>
                </div>
                <div class="countdown-item">
                    <span class="hours">00</span>
                    <label>Часов</label>
                </div>
                <div class="countdown-item">
                    <span class="minutes">00</span>
                    <label>Минут</label>
                </div>
                <div class="countdown-item">
                    <span class="seconds">00</span>
                    <label>Секунд</label>
                </div>
            </div>
        `);

        const dateInput = widget.querySelector('#countdown-date');
        const startBtn = widget.querySelector('.start-countdown');
        const displays = {
            days: widget.querySelector('.days'),
            hours: widget.querySelector('.hours'),
            minutes: widget.querySelector('.minutes'),
            seconds: widget.querySelector('.seconds')
        };

        let countdownInterval;

        startBtn.addEventListener('click', () => {
            const targetDate = new Date(dateInput.value).getTime();
            clearInterval(countdownInterval);
            
            countdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = targetDate - now;

                if (distance < 0) {
                    clearInterval(countdownInterval);
                    Object.values(displays).forEach(display => display.textContent = '00');
                    return;
                }

                displays.days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                displays.hours.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                displays.minutes.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                displays.seconds.textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }, 1000);
        });

        return widget;
    }

    // Виджет прогресс-бара
    function initProgressWidget() {
        const widget = createWidget('progress', 'Прогресс', `
            <div class="progress-controls">
                <input type="number" min="0" max="100" value="0" class="progress-input">
                <button class="set-progress">Установить</button>
            </div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
                <span class="progress-text">0%</span>
            </div>
            <div class="progress-buttons">
                <button class="progress-minus">-10%</button>
                <button class="progress-plus">+10%</button>
            </div>
        `);

        const input = widget.querySelector('.progress-input');
        const fill = widget.querySelector('.progress-fill');
        const text = widget.querySelector('.progress-text');
        const setBtn = widget.querySelector('.set-progress');
        const minusBtn = widget.querySelector('.progress-minus');
        const plusBtn = widget.querySelector('.progress-plus');

        function updateProgress(value) {
            const progress = Math.min(100, Math.max(0, value));
            fill.style.width = `${progress}%`;
            text.textContent = `${progress}%`;
            input.value = progress;
        }

        setBtn.addEventListener('click', () => updateProgress(parseInt(input.value)));
        minusBtn.addEventListener('click', () => updateProgress(parseInt(input.value) - 10));
        plusBtn.addEventListener('click', () => updateProgress(parseInt(input.value) + 10));

        return widget;
    }

    // Виджет генератора паролей
    function initPasswordWidget() {
        const widget = createWidget('password', 'Генератор паролей', `
            <div class="password-options">
                <label><input type="checkbox" class="use-uppercase" checked> Заглавные буквы</label>
                <label><input type="checkbox" class="use-numbers" checked> Цифры</label>
                <label><input type="checkbox" class="use-symbols"> Символы</label>
                <div class="length-control">
                    <span>Длина: </span>
                    <input type="number" min="6" max="32" value="12" class="password-length">
                </div>
            </div>
            <div class="password-result">
                <input type="text" readonly class="generated-password">
                <button class="copy-password">Копировать</button>
            </div>
            <button class="generate-password">Сгенерировать</button>
        `);

        const options = {
            uppercase: widget.querySelector('.use-uppercase'),
            numbers: widget.querySelector('.use-numbers'),
            symbols: widget.querySelector('.use-symbols'),
            length: widget.querySelector('.password-length')
        };
        const resultInput = widget.querySelector('.generated-password');
        const generateBtn = widget.querySelector('.generate-password');
        const copyBtn = widget.querySelector('.copy-password');

        function generatePassword() {
            const chars = {
                lower: 'abcdefghijklmnopqrstuvwxyz',
                upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                numbers: '0123456789',
                symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
            };

            let allowedChars = chars.lower;
            if (options.uppercase.checked) allowedChars += chars.upper;
            if (options.numbers.checked) allowedChars += chars.numbers;
            if (options.symbols.checked) allowedChars += chars.symbols;

            let password = '';
            for (let i = 0; i < options.length.value; i++) {
                password += allowedChars[Math.floor(Math.random() * allowedChars.length)];
            }
            resultInput.value = password;
        }

        generateBtn.addEventListener('click', generatePassword);
        copyBtn.addEventListener('click', () => {
            resultInput.select();
            document.execCommand('copy');
            copyBtn.textContent = 'Скопировано!';
            setTimeout(() => copyBtn.textContent = 'Копировать', 2000);
        });

        return widget;
    }

    // Виджет конвертера валют
    function initCurrencyWidget() {
        const widget = createWidget('currency', 'Конвертер валют', `
            <div class="currency-inputs">
                <div class="currency-group">
                    <input type="number" value="1" class="currency-amount">
                    <select class="currency-from">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="RUB">RUB</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <button class="swap-currency">⇄</button>
                <div class="currency-group">
                    <input type="number" class="currency-result" readonly>
                    <select class="currency-to">
                        <option value="RUB">RUB</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
            </div>
            <button class="convert-currency">Конвертировать</button>
        `);

        const amount = widget.querySelector('.currency-amount');
        const result = widget.querySelector('.currency-result');
        const fromSelect = widget.querySelector('.currency-from');
        const toSelect = widget.querySelector('.currency-to');
        const convertBtn = widget.querySelector('.convert-currency');
        const swapBtn = widget.querySelector('.swap-currency');

        // Здесь можно подключить реальное API для курсов валют
        const rates = {
            USD: { EUR: 0.85, RUB: 75.5, GBP: 0.73, USD: 1 },
            EUR: { USD: 1.18, RUB: 89.1, GBP: 0.86, EUR: 1 },
            RUB: { USD: 0.013, EUR: 0.011, GBP: 0.0096, RUB: 1 },
            GBP: { USD: 1.37, EUR: 1.16, RUB: 103.5, GBP: 1 }
        };

        function convert() {
            const from = fromSelect.value;
            const to = toSelect.value;
            const value = parseFloat(amount.value);
            result.value = (value * rates[from][to]).toFixed(2);
        }

        convertBtn.addEventListener('click', convert);
        swapBtn.addEventListener('click', () => {
            [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
            convert();
        });

        return widget;
    }

    // Виджет музыкального плеера
    function initMusicWidget() {
        const widget = createWidget('music', 'Музыкальный плеер', `
            <div class="music-info">
                <div class="music-title">Нет трека</div>
                <div class="music-artist">Добавьте музыку</div>
            </div>
            <div class="music-progress">
                <input type="range" min="0" max="100" value="0" class="music-slider">
                <div class="music-time">
                    <span class="current-time">0:00</span>
                    <span class="total-time">0:00</span>
                </div>
            </div>
            <div class="music-controls">
                <button class="prev-track">⏮</button>
                <button class="play-pause">▶</button>
                <button class="next-track">⏭</button>
                <input type="file" accept="audio/*" class="add-music" multiple>
                <button class="add-music-btn">+</button>
            </div>
        `);

        const playlist = [];
        let currentTrack = null;
        let isPlaying = false;

        const title = widget.querySelector('.music-title');
        const artist = widget.querySelector('.music-artist');
        const slider = widget.querySelector('.music-slider');
        const currentTime = widget.querySelector('.current-time');
        const totalTime = widget.querySelector('.total-time');
        const playPauseBtn = widget.querySelector('.play-pause');
        const prevBtn = widget.querySelector('.prev-track');
        const nextBtn = widget.querySelector('.next-track');
        const addMusicInput = widget.querySelector('.add-music');
        const addMusicBtn = widget.querySelector('.add-music-btn');

        addMusicBtn.addEventListener('click', () => addMusicInput.click());
        addMusicInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const url = URL.createObjectURL(file);
                playlist.push({
                    url,
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    artist: 'Локальный файл'
                });
            });
            if (!currentTrack) loadTrack(0);
        });

        function loadTrack(index) {
            if (!playlist[index]) return;
            if (currentTrack) currentTrack.pause();
            
            currentTrack = new Audio(playlist[index].url);
            title.textContent = playlist[index].title;
            artist.textContent = playlist[index].artist;
            
            currentTrack.addEventListener('timeupdate', updateProgress);
            currentTrack.addEventListener('loadedmetadata', () => {
                totalTime.textContent = formatTime(currentTrack.duration);
                slider.max = currentTrack.duration;
            });
            
            if (isPlaying) currentTrack.play();
        }

        function updateProgress() {
            slider.value = currentTrack.currentTime;
            currentTime.textContent = formatTime(currentTrack.currentTime);
        }

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        playPauseBtn.addEventListener('click', () => {
            if (!currentTrack) return;
            if (isPlaying) {
                currentTrack.pause();
                playPauseBtn.textContent = '▶';
            } else {
                currentTrack.play();
                playPauseBtn.textContent = '⏸';
            }
            isPlaying = !isPlaying;
        });

        slider.addEventListener('input', () => {
            if (!currentTrack) return;
            currentTrack.currentTime = slider.value;
        });

        return widget;
    }

    // Виджет погоды с прогнозом
    function initWeatherForecastWidget() {
        const widget = createWidget('weather-forecast', 'Прогноз погоды', `
            <div class="weather-search">
                <input type="text" placeholder="Введите город" class="city-input">
                <button class="search-weather">🔍</button>
            </div>
            <div class="current-weather">
                <div class="weather-main">
                    <div class="temperature">--°C</div>
                    <div class="weather-description">Нет данных</div>
                </div>
                <div class="weather-details">
                    <div class="detail">
                        <span class="humidity">--%</span>
                        <label>Влажность</label>
                    </div>
                    <div class="detail">
                        <span class="wind">-- м/с</span>
                        <label>Ветер</label>
                    </div>
                </div>
            </div>
            <div class="forecast-container">
                <div class="forecast-scroll"></div>
            </div>
        `);

        const cityInput = widget.querySelector('.city-input');
        const searchBtn = widget.querySelector('.search-weather');
        const forecastContainer = widget.querySelector('.forecast-scroll');

        // Здесь можно подключить реальное API погоды
        const mockWeather = {
            temp: 20,
            description: 'Ясно',
            humidity: 65,
            wind: 5,
            forecast: [
                { day: 'Пн', temp: 22, icon: '☀️' },
                { day: 'Вт', temp: 19, icon: '🌤' },
                { day: 'Ср', temp: 18, icon: '☁️' },
                { day: 'Чт', temp: 21, icon: '⛅️' },
                { day: 'Пт', temp: 23, icon: '☀️' }
            ]
        };

        function updateWeather() {
            const city = cityInput.value;
            if (!city) return;

            // Обновляем текущую погоду
            widget.querySelector('.temperature').textContent = `${mockWeather.temp}°C`;
            widget.querySelector('.weather-description').textContent = mockWeather.description;
            widget.querySelector('.humidity').textContent = `${mockWeather.humidity}%`;
            widget.querySelector('.wind').textContent = `${mockWeather.wind} м/с`;

            // Обновляем прогноз
            forecastContainer.innerHTML = mockWeather.forecast.map(day => `
                <div class="forecast-day">
                    <div class="forecast-date">${day.day}</div>
                    <div class="forecast-icon">${day.icon}</div>
                    <div class="forecast-temp">${day.temp}°C</div>
                </div>
            `).join('');
        }

        searchBtn.addEventListener('click', updateWeather);
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') updateWeather();
        });

        return widget;
    }

    // Добавляем все виджеты на страницу
    container.appendChild(clockWidget);
    container.appendChild(timerWidget);
    container.appendChild(stopwatchWidget);
    container.appendChild(calendarWidget);
    container.appendChild(weatherWidget);
    container.appendChild(calculatorWidget);
    container.appendChild(notesWidget);
    container.appendChild(todoWidget);
    container.appendChild(quoteWidget);

    // Создаем и добавляем новые виджеты
    const countdownWidget = initCountdownWidget();
    const progressWidget = initProgressWidget();
    const passwordWidget = initPasswordWidget();
    const currencyWidget = initCurrencyWidget();
    const musicWidget = initMusicWidget();
    const weatherForecastWidget = initWeatherForecastWidget();

    // Добавляем новые виджеты в контейнер
    if (countdownWidget) container.appendChild(countdownWidget);
    if (progressWidget) container.appendChild(progressWidget);
    if (passwordWidget) container.appendChild(passwordWidget);
    if (currencyWidget) container.appendChild(currencyWidget);
    if (musicWidget) container.appendChild(musicWidget);
    if (weatherForecastWidget) container.appendChild(weatherForecastWidget);

    // Инициализируем функциональность всех виджетов
    initClock();
    initTimer();
    initStopwatch();
    initCalendar();
    initWeather();
    initCalculator();
    initNotes();
    initTodo();
    initQuotes();
});

// Функция создания виджета
function createWidget(id, title, content) {
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.id = id;
    
    widget.innerHTML = `
        <div class="widget-header">
            <h3>${title}</h3>
            <button class="show-code-btn">Показать код</button>
        </div>
        <div class="widget-content">
            ${content}
        </div>
        <div class="code-preview" style="display: none;">
            <div class="code-section">
                <h4>HTML</h4>
                <pre class="preview-code-html"></pre>
                <button class="copy-btn-html">Копировать HTML</button>
            </div>
            <div class="code-section">
                <h4>CSS</h4>
                <pre class="preview-code-css"></pre>
                <button class="copy-btn-css">Копировать CSS</button>
            </div>
            <div class="code-section">
                <h4>JavaScript</h4>
                <pre class="preview-code-js"></pre>
                <button class="copy-btn-js">Копировать JS</button>
            </div>
        </div>
    `;

    const showCodeBtn = widget.querySelector('.show-code-btn');
    const codePreview = widget.querySelector('.code-preview');
    const previewHtml = widget.querySelector('.preview-code-html');
    const previewCss = widget.querySelector('.preview-code-css');
    const previewJs = widget.querySelector('.preview-code-js');
    const copyHtmlBtn = widget.querySelector('.copy-btn-html');
    const copyCssBtn = widget.querySelector('.copy-btn-css');
    const copyJsBtn = widget.querySelector('.copy-btn-js');
    let isCodeVisible = false;

    showCodeBtn.addEventListener('click', () => {
        isCodeVisible = !isCodeVisible;
        codePreview.style.display = isCodeVisible ? 'block' : 'none';
        showCodeBtn.textContent = isCodeVisible ? 'Скрыть код' : 'Показать код';
        
        if (isCodeVisible) {
            const widgetContent = widget.querySelector('.widget-content').innerHTML;
            const currentTheme = document.body.dataset.theme || 'default';
            
            // HTML код
            const htmlCode = `<div class="widget" data-theme="${currentTheme}">
    <div class="widget-content">
        ${widgetContent}
    </div>
</div>`;
            
            // CSS код
            const cssCode = `/* Стили для виджета */
.widget {
    background: var(--surface-color, #ffffff);
    border-radius: var(--border-radius, 12px);
    padding: 20px;
    box-shadow: var(--shadow, 0 2px 8px rgba(0,0,0,0.1));
    margin-bottom: 20px;
}

.widget-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.widget button {
    background: var(--primary-color, #6200ee);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: var(--border-radius, 8px);
    cursor: pointer;
    transition: 0.3s;
}

.widget button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

.widget input {
    padding: 8px;
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: var(--border-radius, 8px);
    outline: none;
}`;
            
            // JavaScript код
            const jsCode = `// Инициализация виджета
document.addEventListener('DOMContentLoaded', () => {
    const widget = document.querySelector('.widget');
    ${getWidgetInitCode(id)}
});`;
            
            previewHtml.textContent = htmlCode;
            previewCss.textContent = cssCode;
            previewJs.textContent = jsCode;
        }
    });

    // Функция для копирования с анимацией кнопки
    async function copyCode(code, button) {
        try {
            await navigator.clipboard.writeText(code);
            const originalText = button.textContent;
            button.textContent = 'Скопировано!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                button.textContent = 'Скопировано!';
                button.style.backgroundColor = '#4CAF50';
            } catch (err) {
                button.textContent = 'Ошибка!';
                button.style.backgroundColor = '#f44336';
            }
            document.body.removeChild(textArea);
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }
    }

    // Обработчики для кнопок копирования
    copyHtmlBtn.addEventListener('click', () => copyCode(previewHtml.textContent, copyHtmlBtn));
    copyCssBtn.addEventListener('click', () => copyCode(previewCss.textContent, copyCssBtn));
    copyJsBtn.addEventListener('click', () => copyCode(previewJs.textContent, copyJsBtn));
    
    return widget;
}

// Функция для получения кода инициализации конкретного виджета
function getWidgetInitCode(widgetId) {
    const initCodes = {
        'clock': `
    // Обновление часов каждую секунду
    function updateClock() {
        const now = new Date();
        widget.querySelector('.time').textContent = now.toLocaleTimeString();
        widget.querySelector('.date').textContent = now.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }
    updateClock();
    setInterval(updateClock, 1000);`,
        'timer': `
    let timeLeft = 0;
    let timerId = null;
    
    widget.querySelector('.start').addEventListener('click', () => {
        if (!timerId) {
            const hours = parseInt(widget.querySelector('.hours').value) || 0;
            const minutes = parseInt(widget.querySelector('.minutes').value) || 0;
            const seconds = parseInt(widget.querySelector('.seconds').value) || 0;
            timeLeft = hours * 3600 + minutes * 60 + seconds;
            if (timeLeft > 0) {
                timerId = setInterval(() => {
                    timeLeft--;
                    updateDisplay();
                    if (timeLeft <= 0) {
                        clearInterval(timerId);
                        timerId = null;
                    }
                }, 1000);
            }
        }
    });`,
        // Добавь сюда код инициализации для других виджетов
    };
    
    return initCodes[widgetId] || '// Код инициализации для этого виджета';
}

// Инициализация часов
function initClock() {
    const clockDisplay = document.querySelector('.widget-clock .time');
    const dateDisplay = document.querySelector('.widget-clock .date');
    
    function updateClock() {
        const now = new Date();
        clockDisplay.textContent = now.toLocaleTimeString();
        dateDisplay.textContent = now.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// Инициализация таймера
function initTimer() {
    const display = document.querySelector('.widget-timer .display');
    const startBtn = document.querySelector('.widget-timer .start');
    const stopBtn = document.querySelector('.widget-timer .stop');
    const resetBtn = document.querySelector('.widget-timer .reset');
    const hoursInput = document.querySelector('.widget-timer .hours');
    const minutesInput = document.querySelector('.widget-timer .minutes');
    const secondsInput = document.querySelector('.widget-timer .seconds');
    
    let timeLeft = 0;
    let timerId = null;
    
    function updateDisplay() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    startBtn.addEventListener('click', () => {
        if (!timerId) {
            const hours = parseInt(hoursInput.value) || 0;
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;
            
            timeLeft = hours * 3600 + minutes * 60 + seconds;
            
            if (timeLeft > 0) {
                timerId = setInterval(() => {
                    timeLeft--;
                    updateDisplay();
                    if (timeLeft <= 0) {
                        clearInterval(timerId);
                        timerId = null;
                    }
                }, 1000);
            }
        }
    });
    
    stopBtn.addEventListener('click', () => {
        clearInterval(timerId);
        timerId = null;
    });
    
    resetBtn.addEventListener('click', () => {
        clearInterval(timerId);
        timerId = null;
        timeLeft = 0;
        updateDisplay();
        hoursInput.value = '';
        minutesInput.value = '';
        secondsInput.value = '';
    });
}

// Инициализация секундомера
function initStopwatch() {
    const display = document.querySelector('.widget-stopwatch .display');
    const startBtn = document.querySelector('.widget-stopwatch .start');
    const stopBtn = document.querySelector('.widget-stopwatch .stop');
    const resetBtn = document.querySelector('.widget-stopwatch .reset');
    const lapsContainer = document.querySelector('.widget-stopwatch .laps');
    
    let startTime;
    let elapsedTime = 0;
    let timerId = null;
    
    function updateDisplay() {
        const totalMs = elapsedTime;
        const hours = Math.floor(totalMs / 3600000);
        const minutes = Math.floor((totalMs % 3600000) / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        const ms = Math.floor((totalMs % 1000) / 10);
        
        display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    }
    
    startBtn.addEventListener('click', () => {
        if (!timerId) {
            startTime = Date.now() - elapsedTime;
            timerId = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            startBtn.textContent = 'Пауза';
        } else {
            clearInterval(timerId);
            timerId = null;
            startBtn.textContent = 'Старт';
        }
    });
    
    stopBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
            startBtn.textContent = 'Старт';
            const lap = document.createElement('div');
            lap.textContent = display.textContent;
            lapsContainer.insertBefore(lap, lapsContainer.firstChild);
        }
    });
    
    resetBtn.addEventListener('click', () => {
        clearInterval(timerId);
        timerId = null;
        elapsedTime = 0;
        updateDisplay();
        lapsContainer.innerHTML = '';
        startBtn.textContent = 'Старт';
    });
}

// Инициализация календаря
function initCalendar() {
    const calendar = document.querySelector('.widget-calendar');
    const monthDisplay = calendar.querySelector('.current-month');
    const calendarGrid = calendar.querySelector('.calendar-grid');
    const prevBtn = calendar.querySelector('.prev-month');
    const nextBtn = calendar.querySelector('.next-month');
    
    let currentDate = new Date();
    
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        monthDisplay.textContent = new Date(year, month).toLocaleString('ru-RU', {
            month: 'long',
            year: 'numeric'
        });
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = firstDay.getDay() || 7;
        
        calendarGrid.innerHTML = '';
        
        // Пустые ячейки до первого дня месяца
        for (let i = 1; i < startDay; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }
        
        // Дни месяца
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayEl = document.createElement('div');
            dayEl.textContent = day;
            if (day === new Date().getDate() && 
                month === new Date().getMonth() && 
                year === new Date().getFullYear()) {
                dayEl.classList.add('current-day');
            }
            calendarGrid.appendChild(dayEl);
        }
    }
    
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });
    
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });
    
    updateCalendar();
}

// Инициализация погоды
function initWeather() {
    const weatherWidget = document.querySelector('.widget-weather');
    const cityInput = weatherWidget.querySelector('.city-input');
    const searchBtn = weatherWidget.querySelector('.search-btn');
    const temperature = weatherWidget.querySelector('.temperature');
    const description = weatherWidget.querySelector('.weather-description');
    const humidity = weatherWidget.querySelector('.humidity');
    const wind = weatherWidget.querySelector('.wind');
    
    const API_KEY = ''; // Нужно будет добавить свой API ключ
    
    async function getWeather(city) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
            );
            const data = await response.json();
            
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;
            humidity.textContent = `Влажность: ${data.main.humidity}%`;
            wind.textContent = `Ветер: ${Math.round(data.wind.speed)} м/с`;
        } catch (err) {
            alert('Город не найден');
        }
    }
    
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            }
        }
    });
}

// Инициализация калькулятора
function initCalculator() {
    const calculator = document.querySelector('.widget-calculator');
    const display = calculator.querySelector('.calc-display');
    const buttons = calculator.querySelectorAll('.calc-btn');
    
    let currentExpression = '0';
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            const value = button.textContent;
            
            if (type === 'number') {
                if (currentExpression === '0') {
                    currentExpression = value;
                } else {
                    currentExpression += value;
                }
            } else if (type === 'operator') {
                currentExpression += value;
            } else if (type === 'clear') {
                currentExpression = '0';
            } else if (type === 'equals') {
                try {
                    currentExpression = eval(currentExpression).toString();
                } catch (err) {
                    currentExpression = 'Ошибка';
                }
            }
            
            display.value = currentExpression;
        });
    });
}

// Инициализация заметок
function initNotes() {
    const notesWidget = document.querySelector('.widget-notes');
    const notesList = notesWidget.querySelector('.notes-list');
    const noteInput = notesWidget.querySelector('.note-text');
    const addBtn = notesWidget.querySelector('.add-note');
    
    let notes = JSON.parse(localStorage.getItem('notes') || '[]');
    
    function updateNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteEl = document.createElement('div');
            noteEl.className = 'note-item';
            noteEl.innerHTML = `
                <span>${note}</span>
                <button class="delete-note" data-index="${index}">×</button>
            `;
            notesList.appendChild(noteEl);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    
    addBtn.addEventListener('click', () => {
        const text = noteInput.value.trim();
        if (text) {
            notes.push(text);
            noteInput.value = '';
            updateNotes();
        }
    });
    
    notesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-note')) {
            const index = e.target.dataset.index;
            notes.splice(index, 1);
            updateNotes();
        }
    });
    
    updateNotes();
}

// Инициализация списка задач
function initTodo() {
    const todoWidget = document.querySelector('.widget-todo');
    const todoList = todoWidget.querySelector('.todo-list');
    const todoInput = todoWidget.querySelector('.todo-text');
    const addBtn = todoWidget.querySelector('.add-todo');
    
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    
    function updateTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoEl = document.createElement('div');
            todoEl.className = 'todo-item';
            todoEl.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button class="delete-todo" data-index="${index}">×</button>
            `;
            todoList.appendChild(todoEl);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    addBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = '';
            updateTodos();
        }
    });
    
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-todo')) {
            const index = e.target.dataset.index;
            todos.splice(index, 1);
            updateTodos();
        } else if (e.target.type === 'checkbox') {
            const index = e.target.nextElementSibling.nextElementSibling.dataset.index;
            todos[index].completed = e.target.checked;
            updateTodos();
        }
    });
    
    updateTodos();
}

// Инициализация цитат
function initQuotes() {
    const quoteWidget = document.querySelector('.widget-quote');
    const quoteText = quoteWidget.querySelector('.quote-text');
    const quoteAuthor = quoteWidget.querySelector('.quote-author');
    const newQuoteBtn = quoteWidget.querySelector('.new-quote');
    
    const quotes = [
        { text: 'Жизнь - это то, что с тобой происходит, пока ты строишь планы', author: 'Джон Леннон' },
        { text: 'Будь тем изменением, которое ты хочешь видеть в мире', author: 'Махатма Ганди' },
        { text: 'Все мы гении. Но если вы будете судить рыбу по её способности взбираться на дерево, она проживёт всю жизнь, считая себя дурой', author: 'Альберт Эйнштейн' },
        { text: 'Успех - это способность шагать от одной неудачи к другой, не теряя энтузиазма', author: 'Уинстон Черчилль' },
        { text: 'Лучше быть хорошим человеком, ругающимся матом, чем тихой, воспитанной тварью', author: 'Фаина Раневская' }
    ];
    
    function showRandomQuote() {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
    }
    
    newQuoteBtn.addEventListener('click', showRandomQuote);
    showRandomQuote();
} 