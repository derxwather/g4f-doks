# 🤖 G4F - Бесплатная библиотека для работы с ИИ

## 📥 Установка
```bash
pip install g4f
```

<details>
<summary>🚀 Быстрый старт</summary>

Простой пример использования с ChatGptEs (самый быстрый провайдер):

```python
import g4f

# Устанавливаем провайдера
g4f.debug.logging = True  # Включаем логи
provider = g4f.Provider.ChatgptEs 

# Отправляем запрос
response = g4f.ChatCompletion.create(
    model="gpt-3.5-turbo",
    provider=provider,
    messages=[{"role": "user", "content": "Привет, как дела?"}],
)

print(response)
```
</details>

<details>
<summary>📚 Подробное описание всех функций</summary>

### 🔄 Основные функции

#### `g4f.ChatCompletion.create()`
Основная функция для отправки запросов к ИИ моделям.
```python
response = g4f.ChatCompletion.create(
    model="gpt-3.5-turbo",    # Модель для использования
    provider=provider,         # Провайдер (например ChatgptEs)
    messages=[                 # Список сообщений
        {
            "role": "user",    # Роль: user/assistant/system
            "content": "текст" # Содержание сообщения
        }
    ],
    stream=True,              # Потоковый вывод
    temperature=0.7,          # Креативность (0.0-1.0)
    top_p=0.9,               # Разнообразие ответов
    max_tokens=2000          # Максимальная длина ответа
)
```

#### `g4f.debug`
Настройки отладки и конфигурации:
```python
g4f.debug.logging = True           # Включить логирование
g4f.debug.version = '0.1.5.1'      # Версия библиотеки
g4f.debug.request_timeout = 30     # Таймаут запросов
g4f.debug.proxies = {              # Настройка прокси
    "http": "http://proxy:8080",
    "https": "https://proxy:8080"
}
```

### 🎨 Работа с изображениями

```python
import g4f
from g4f.Provider import Bing
from g4f.Provider.bing.create_images import patch_provider

# Генерация изображения через Bing
response = g4f.ChatCompletion.create(
    model=g4f.models.default,
    provider=Bing,
    messages=[{
        "role": "user", 
        "content": "GENERATE IMAGE: Нарисуй котика"
    }],
    patch_provider=patch_provider  # Важно для работы с изображениями
)

# В ответе будет URL изображения
print(response)  # https://bing.com/create/image/url...

# Для других провайдеров (например Prodia) тоже вернется ссылка
from g4f.Provider import Prodia

response = g4f.ChatCompletion.create(
    model="prodia",
    provider=Prodia,
    messages=[{
        "role": "user",
        "content": "Нарисуй пейзаж"
    }]
)

# Получим ссылку на сгенерированное изображение
print(response)  # https://prodia.com/image/...

# Чтобы сохранить изображение:
import requests
import os

def save_image(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"Изображение сохранено как {filename}")
    else:
        print("Ошибка при скачивании изображения")

# Пример использования
save_image(response, "generated_image.png")
```

⚠️ **Важно:**
- Провайдеры возвращают ссылку на изображение, а не само изображение
- Для Bing нужно использовать `patch_provider`
- Некоторым провайдерам нужны куки для работы
- Ссылки могут быть временными, лучше сразу сохранять изображения

#### Flux
```python
from g4f.Provider import Flux

response = g4f.ChatCompletion.create(
    model="flux",
    provider=Flux,
    messages=[{
        "role": "user",
        "content": "Создай пейзаж"
    }]
)

# Получим ссылку на изображение
print(response)  # https://flux.ai/image/...

# Сохраняем изображение
save_image(response, "flux_image.png")
```

### 💬 Работа с чатом

#### Создание диалога
```python
messages = [
    {"role": "system", "content": "Ты дружелюбный помощник"},
    {"role": "user", "content": "Привет!"},
    {"role": "assistant", "content": "Здравствуйте!"},
    {"role": "user", "content": "Как дела?"}
]

response = g4f.ChatCompletion.create(
    model="gpt-3.5-turbo",
    provider=ChatgptEs,
    messages=messages
)
```

#### Стриминг ответов
```python
response = g4f.ChatCompletion.create(
    model="gpt-3.5-turbo",
    provider=ChatgptEs,
    messages=[{"role": "user", "content": prompt}],
    stream=True
)

for chunk in response:
    print(chunk, end="", flush=True)
```

### 🛠 Дополнительные функции

#### Асинхронные запросы
```python
import asyncio
import g4f

async def get_async_response(prompt):
    response = await g4f.ChatCompletion.create_async(
        model="gpt-3.5-turbo",
        provider=ChatgptEs,
        messages=[{"role": "user", "content": prompt}]
    )
    return response

# Использование
async def main():
    response = await get_async_response("Привет!")
    print(response)

asyncio.run(main())
```

#### Обработка ошибок
```python
try:
    response = g4f.ChatCompletion.create(
        model="gpt-3.5-turbo",
        provider=ChatgptEs,
        messages=[{"role": "user", "content": prompt}]
    )
except g4f.errors.ProviderNotFoundError:
    print("Провайдер не найден")
except g4f.errors.ProviderNotWorkingError:
    print("Провайдер не работает")
except Exception as e:
    print(f"Неизвестная ошибка: {str(e)}")
```
</details>

<details>
<summary>🎨 Генерация изображений</summary>

### Основное использование
```python
import g4f
from g4f.Provider import Bing
from g4f.Provider.bing.create_images import patch_provider

# Генерация через Bing (самый стабильный)
response = g4f.ChatCompletion.create(
    model=g4f.models.default,
    provider=Bing,
    messages=[{
        "role": "user", 
        "content": "GENERATE IMAGE: Нарисуй котика"
    }],
    patch_provider=patch_provider  # Важно!
)

print(response)  # https://bing.com/create/image/url...
```

### Сохранение изображений
```python
import requests

def save_image(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"✅ Изображение сохранено как {filename}")
    else:
        print("❌ Ошибка при скачивании")

# Пример использования
save_image(response, "my_image.png")
```

### Другие провайдеры

#### Prodia
```python
from g4f.Provider import Prodia

response = g4f.ChatCompletion.create(
    model="prodia",
    provider=Prodia,
    messages=[{
        "role": "user",
        "content": "Нарисуй пейзаж"
    }]
)
```

#### Flux
```python
from g4f.Provider import Flux

response = g4f.ChatCompletion.create(
    model="flux",
    provider=Flux,
    messages=[{
        "role": "user",
        "content": "Создай пейзаж"
    }]
)
```

### ⚠️ Важные моменты
- Все провайдеры возвращают **ссылку** на изображение
- Bing требует `patch_provider` для работы
- Некоторым провайдерам нужны куки браузера
- Ссылки временные - сразу сохраняйте картинки
- Формат запроса: `"GENERATE IMAGE: описание"`

### 🔧 Настройка Bing
```python
# Если нужны куки
cookies = {
    "cookie_name": "cookie_value",
    # ... другие куки
}

response = g4f.ChatCompletion.create(
    model=g4f.models.default,
    provider=Bing,
    messages=[{"role": "user", "content": "GENERATE IMAGE: cat"}],
    cookies=cookies,
    patch_provider=patch_provider
)
```
</details>

<details>
<summary>💻 Базовое использование</summary>

Пример кода для встраивания в ваш проект:

```python
import g4f
from g4f.Provider import ChatgptEs

def get_ai_response(prompt: str) -> str:
    try:
        response = g4f.ChatCompletion.create(
            model="gpt-3.5-turbo",
            provider=ChatgptEs,
            messages=[{"role": "user", "content": prompt}],
            stream=True  # Включаем стриминг для быстрого ответа
        )
        
        full_response = ""
        for message in response:
            full_response += message
            
        return full_response
    except Exception as e:
        return f"Ошибка: {str(e)}"

# Пример использования
if __name__ == "__main__":
    result = get_ai_response("Напиши короткое стихотворение")
    print(result)
```
</details>

<details>
<summary>🔍 Проверка работоспособности провайдеров</summary>

Код для тестирования всех доступных провайдеров:

```python
import g4f
from g4f.Provider import BaseProvider

def test_provider(provider, prompt="Привет, это тестовое сообщение!"):
    print(f"\nТестируем {provider.__name__}:")
    try:
        response = g4f.ChatCompletion.create(
            model="gpt-3.5-turbo",
            provider=provider,
            messages=[{"role": "user", "content": prompt}]
        )
        print(f"✅ Успешно! Ответ: {response[:100]}...")
        return True
    except Exception as e:
        print(f"❌ Ошибка: {str(e)}")
        return False

def get_all_providers():
    # Получаем все провайдеры автоматически
    providers = []
    for provider in dir(g4f.Provider):
        provider_class = getattr(g4f.Provider, provider)
        # Проверяем, что это класс и наследуется от BaseProvider
        if isinstance(provider_class, type) and issubclass(provider_class, BaseProvider) and provider_class != BaseProvider:
            providers.append(provider_class)
    return providers

def test_all_providers():
    results = []
    providers = get_all_providers()
    
    print("🔄 Начинаем тестирование всех провайдеров...")
    print(f"📋 Найдено провайдеров: {len(providers)}")
    
    # Группируем провайдеры по типу
    provider_types = {
        "Текстовые": [],
        "Изображения": [],
        "Специальные": [],
        "Другие": []
    }
    
    for provider in providers:
        # Определяем тип провайдера по имени или свойствам
        if any(x in provider.__name__.lower() for x in ['gpt', 'chat', 'text']):
            provider_types["Текстовые"].append(provider)
        elif any(x in provider.__name__.lower() for x in ['image', 'prodia', 'flux', 'bing']):
            provider_types["Изображения"].append(provider)
        elif any(x in provider.__name__.lower() for x in ['claude', 'gemini', 'llama', 'mistral']):
            provider_types["Специальные"].append(provider)
        else:
            provider_types["Другие"].append(provider)
    
    # Тестируем провайдеры по группам
    for type_name, type_providers in provider_types.items():
        if type_providers:
            print(f"\n🔹 Тестируем {type_name} провайдеры:")
            for provider in type_providers:
                success = test_provider(provider)
                results.append((provider.__name__, success, type_name))
    
    print("\n📊 Итоги тестирования по категориям:")
    
    # Выводим результаты по категориям
    for type_name in provider_types.keys():
        type_results = [(name, success) for name, success, t in results if t == type_name]
        if type_results:
            print(f"\n{type_name}:")
            
            working = [name for name, success in type_results if success]
            if working:
                print("✅ Работают:")
                for name in working:
                    print(f"• {name}")
            
            not_working = [name for name, success in type_results if not success]
            if not_working:
                print("❌ Не работают:")
                for name in not_working:
                    print(f"• {name}")
    
    # Общая статистика
    total = len(results)
    working_count = len([r for r in results if r[1]])
    print(f"\n📈 Общая статистика:")
    print(f"• Всего провайдеров: {total}")
    print(f"• Работает: {working_count}")
    print(f"• Не работает: {total - working_count}")
    print(f"• Процент работающих: {(working_count/total)*100:.1f}%")

if __name__ == "__main__":
    test_all_providers()
```
</details>

<details>
<summary>⚠️ Важные нюансы</summary>

1. Некоторые провайдеры могут работать нестабильно
2. Рекомендуется использовать VPN для надежности
3. ChatGptEs обычно самый быстрый, но может требовать прокси
4. При ошибках проверьте:
   - Подключение к интернету
   - Доступность провайдера
   - Правильность запроса
   - Наличие VPN/прокси
</details>

<details>
<summary>🔧 Дополнительные настройки</summary>

```python
# Включение отладки
g4f.debug.logging = True

# Использование прокси
g4f.debug.proxies = {
    "http": "http://proxy.example.com:8080",
    "https": "http://proxy.example.com:8080"
}

# Установка таймаута
g4f.debug.request_timeout = 30  # в секундах
```
</details>

<details>
<summary>📚 Поддерживаемые модели</summary>

- gpt-3.5-turbo
- gpt-4
- claude-2
- gemini-pro
- и другие (зависит от провайдера)
</details>

## 🤝 Вклад в проект
Буду рада вашим пулл-реквестам и идеям по улучшению документации! 