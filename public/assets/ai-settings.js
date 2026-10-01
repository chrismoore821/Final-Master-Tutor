(function () {
  const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
  const GROQ_MODELS = [
    { value: 'openai/gpt-oss-120b', label: 'GPT-OSS 120B (best)' },
    { value: 'openai/gpt-oss-20b', label: 'GPT-OSS 20B (faster)' },
    { value: 'qwen/qwen3.6-27b', label: 'Qwen 3.6 27B' },
    { value: 'moonshotai/kimi-k2-instruct-0905', label: 'Kimi K2 (coding/reasoning)' }
  ];
  const GEMINI_MODELS = [
    { value: 'gemini-3.8-flash', label: 'Gemini 3.8 Flash (best)' },
    { value: 'gemini-3.7-flash', label: 'Gemini 3.7 Flash' },
    { value: 'gemini-3.6-flash', label: 'Gemini 3.6 Flash' },
    { value: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash (fastest)' },
    { value: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash-Lite' }
  ];
  let draftModels = {};
  let draftProvider = 'groq';

  function getProvider() {
    return localStorage.getItem('ai_provider') === 'gemini' ? 'gemini' : 'groq';
  }

  function getProviderName() {
    return getProvider() === 'gemini' ? 'Gemini' : 'Groq';
  }

  function getKey(provider) {
    if (provider === 'gemini') return localStorage.getItem('apiKeyGemini') || '';
    return localStorage.getItem('apiKeyGroq') ?? localStorage.getItem('apiKey') ?? '';
  }

  function getActiveKey() {
    return getKey(getProvider()).trim();
  }

  function getActiveUrl() {
    return getProvider() === 'gemini' ? GEMINI_URL : GROQ_URL;
  }

  function getActiveModels(provider = getProvider()) {
    return provider === 'gemini' ? GEMINI_MODELS : GROQ_MODELS;
  }

  function getActiveModel(provider = getProvider()) {
    const models = getActiveModels(provider);
    const saved = localStorage.getItem('model_' + provider) || localStorage.getItem('model');
    return models.some(model => model.value === saved) ? saved : models[0].value;
  }

  function populateModels() {
    const provider = document.getElementById('provider').value;
    const select = document.getElementById('model');
    const models = getActiveModels(provider);
    const current = draftModels[provider] || getActiveModel(provider);
    select.replaceChildren();
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model.value;
      option.textContent = model.label;
      select.appendChild(option);
    });
    select.value = models.some(model => model.value === current) ? current : models[0].value;
  }

  function openSettings() {
    draftProvider = getProvider();
    draftModels = {};
    document.getElementById('provider').value = draftProvider;
    document.getElementById('apiKeyGroq').value = getKey('groq');
    document.getElementById('apiKeyGemini').value = getKey('gemini');
    populateModels();
  }

  function bindSettings(setStatus) {
    const updateStatus = () => {
      const provider = document.getElementById('provider').value;
      const key = document.getElementById(provider === 'gemini' ? 'apiKeyGemini' : 'apiKeyGroq').value.trim();
      setStatus(key ? 'Key entered — save to apply' : 'No ' + (provider === 'gemini' ? 'Gemini' : 'Groq') + ' key', key ? 'ok' : '');
    };
    document.getElementById('provider').onchange = () => {
      draftModels[draftProvider] = document.getElementById('model').value;
      draftProvider = document.getElementById('provider').value;
      populateModels();
      updateStatus();
    };
    document.getElementById('apiKeyGroq').addEventListener('input', updateStatus);
    document.getElementById('apiKeyGemini').addEventListener('input', updateStatus);
    document.getElementById('settings').addEventListener('click', event => {
      if (event.target === event.currentTarget) {
        const hasKey = Boolean(getActiveKey());
        setStatus(hasKey ? 'Ready' : 'Set ' + getProviderName() + ' API key', hasKey ? 'ok' : '');
      }
    });
  }

  function saveSettings() {
    const provider = document.getElementById('provider').value;
    if (provider !== 'groq' && provider !== 'gemini') throw new Error('Choose a supported AI provider');
    const groqKey = document.getElementById('apiKeyGroq').value.trim();
    const geminiKey = document.getElementById('apiKeyGemini').value.trim();
    const model = document.getElementById('model').value;
    if (!getActiveModels(provider).some(option => option.value === model)) throw new Error('Choose a supported model');
    localStorage.setItem('apiKeyGroq', groqKey);
    localStorage.setItem('apiKeyGemini', geminiKey);
    localStorage.setItem('apiKey', groqKey);
    draftModels[provider] = model;
    Object.entries(draftModels).forEach(([name, value]) => {
      if (getActiveModels(name).some(option => option.value === value)) localStorage.setItem('model_' + name, value);
    });
    localStorage.setItem('model', model);
    localStorage.setItem('ai_provider', provider);
  }

  function collectSettings() {
    return {
      ai_provider: getProvider(),
      apiKeyGroq: getKey('groq'),
      apiKeyGemini: getKey('gemini'),
      model_groq: getActiveModel('groq'),
      model_gemini: getActiveModel('gemini')
    };
  }

  function restoreSettings(data) {
    ['ai_provider', 'apiKeyGroq', 'apiKeyGemini', 'model_groq', 'model_gemini'].forEach(name => {
      if (typeof data[name] === 'string') localStorage.setItem(name, data[name]);
    });
    if (typeof data.apiKey === 'string' && typeof data.apiKeyGroq !== 'string') {
      localStorage.setItem('apiKeyGroq', data.apiKey);
      if (typeof data.ai_provider !== 'string') localStorage.setItem('ai_provider', 'groq');
    }
    if (typeof data.model === 'string' && typeof data['model_' + getProvider()] !== 'string') {
      localStorage.setItem('model_' + getProvider(), data.model);
    }
    localStorage.setItem('apiKey', getKey('groq'));
  }

  window.TutorAI = {
    getActiveKey, getActiveUrl, getActiveModels, getActiveModel, getProviderName,
    openSettings, bindSettings, saveSettings, collectSettings, restoreSettings
  };
}());
