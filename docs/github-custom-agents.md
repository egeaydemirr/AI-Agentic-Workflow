# GitHub Custom Agents: Kullanım Kılavuzu

## Custom Agent Nedir?

Custom Agent, VS Code ve GitHub Copilot içinde çalışan, belirli bir role ve amaca özel olarak tasarlanmış AI asistanlarıdır. Her agent, belirli görevler için optimize edilmiş araçlara, talimatlara ve iş akışı entegrasyonlarına sahiptir.

## Custom Agent Foundry ile Agent Yaratma

**Custom Agent Foundry**, custom agent yaratmak için tasarlanmış özel bir meta-agent'tır. Yani, agent yaratmak için kullanılan bir agent!

### 1. Agent Yaratma Süreci

#### Adım 1: Keşif (Discovery)

Foundry agent'ına aşağıdaki bilgileri verirsin:

- **Role/Persona**: Agent hangi rolü üstlenecek? (örn: security reviewer, planner, architect, test writer)
- **Primary Tasks**: Hangi spesifik görevleri yapacak?
- **Tool Requirements**: Hangi araçlara ihtiyacı var? (sadece okuma mı, düzenleme mi?)
- **Constraints**: Ne YAPMAMALI? (sınırlar, güvenlik kuralları)
- **Workflow Integration**: Tek başına mı çalışacak yoksa başka agentlarla zincirleme mi?
- **Target Users**: Kim kullanacak? (karmaşıklık seviyesini etkiler)

#### Adım 2: Tasarım (Design)

Foundry şunları önerir:

- Agent adı ve açıklaması
- Tool seçimi ve gerekçesi
- Ana talimatlar/kılavuzlar
- İsteğe bağlı handoff'lar (workflow entegrasyonu)

#### Adım 3: Oluşturma (Draft)

Foundry, `.agent.md` dosyasını tam yapısıyla oluşturur.

#### Adım 4: İnceleme ve İyileştirme

Tasarım kararlarını açıklar ve geri bildirimlere göre iterasyon yapar.

### 2. Agent Dosya Yapısı

```markdown
---
description: Kısa, net açıklama (chat input'ta gösterilir) - ZORUNLU
name: Agent'ın görünen adı - Opsiyonel (dosya adı kullanılır)
argument-hint: Kullanıcılar için rehber metin - Opsiyonel
tools: ['tool1', 'tool2', 'toolset/*'] # Kullanılabilir araçlar
model: Claude Sonnet 4.5 # Opsiyonel: belirli model seçimi
handoffs: # Opsiyonel: workflow geçişleri
  - label: Sonraki Adım
    agent: hedef-agent-adı
    prompt: Önceden doldurulmuş prompt metni
    send: false
---

# Agent Başlığı

## Kimlik & Amaç

Agent'ın rolü ve misyonu

## Ana Sorumluluklar

- Birincil görevlerin listesi

## Çalışma Yönergeleri

Nasıl çalışacağı, kalite standartları

## Kısıtlamalar & Sınırlar

NE YAPMAMALI, güvenlik limitleri

## Çıktı Spesifikasyonları

Beklenen format, yapı, detay seviyesi

## Örnekler

Örnek etkileşimler veya çıktılar (gerekiyorsa)

## Tool Kullanım Kalıpları

Belirli araçları ne zaman ve nasıl kullanacağı
```

### 3. Tool Seçim Stratejisi

**Read-only Agents** (planlama, araştırma, inceleme):

```yaml
tools:
  [
    'search',
    'web/fetch',
    'githubRepo',
    'usages',
    'grep_search',
    'read_file',
    'semantic_search',
  ]
```

**Implementation Agents** (kodlama, refactoring):

```yaml
tools:
  [
    'search',
    'read_file',
    'replace_string_in_file',
    'multi_replace_string_in_file',
    'create_file',
    'run_in_terminal',
  ]
```

**Testing Agents**:

```yaml
tools:
  [
    'read_file',
    'run_notebook_cell',
    'test_failure',
    'run_in_terminal',
    'get_errors',
  ]
```

**Deployment Agents**:

```yaml
tools: ['run_in_terminal', 'create_and_run_task', 'get_errors']
```

**MCP Integration** (tüm MCP server araçları):

```yaml
tools: ['mcp_server_name/*']
```

### 4. Yaygın Agent Arketipleri

#### Planner Agent

- **Tools**: Sadece okuma
- **Odak**: Araştırma, analiz, gereksinimleri parçalama
- **Çıktı**: Yapılandırılmış implementasyon planları
- **Handoff**: → Implementation Agent

#### Implementation Agent

- **Tools**: Tam düzenleme yetenekleri
- **Odak**: Kod yazma, refactoring, değişiklikleri uygulama
- **Kısıtlamalar**: Mevcut kalıpları takip et, kaliteyi koru
- **Handoff**: → Review Agent veya Testing Agent

#### Security Reviewer Agent

- **Tools**: Sadece okuma + güvenlik analizi
- **Odak**: Güvenlik açıklarını tespit et, iyileştirmeler öner
- **Çıktı**: Güvenlik değerlendirme raporları

#### Test Writer Agent

- **Tools**: Okuma + yazma + test çalıştırma
- **Odak**: Kapsamlı testler oluştur
- **Pattern**: Önce başarısız testler yaz, sonra implement et

#### Documentation Agent

- **Tools**: Sadece okuma + dosya oluşturma
- **Odak**: Net, kapsamlı dokümantasyon
- **Çıktı**: Markdown dökümanlar, inline yorumlar, API dökümantasyonu

### 5. Workflow Entegrasyon Kalıpları

**Sequential Handoff Chain:**

```
Plan → Implement → Review → Deploy
```

**Iterative Refinement:**

```
Draft → Review → Revise → Finalize
```

**Test-Driven Development:**

```
Write Failing Tests → Implement → Verify Tests Pass
```

**Research-to-Action:**

```
Research → Recommend → Implement
```

### 6. Nasıl Kullanılır?

#### 1. Custom Agent Foundry'yi Çağır

VS Code'da GitHub Copilot Chat'te:

```
@custom-agent-foundry Koç Healthcare için bir mobile architecture reviewer agent yaratmak istiyorum
```

#### 2. Gereksinimlerini Belirt

```
Bu agent:
- React Native kod incelemesi yapacak
- Koç Mobil architecture.md standardlarına uygunluk kontrol edecek
- Sadece inceleme yapacak, kod değiştirmeyecek
- Architecture violations tespit edip rapor edecek
```

#### 3. Foundry Agent'ı Oluşturur

`.github/agents/` klasörü altında yeni `.agent.md` dosyası oluşturulur.

#### 4. Agent'ı Kullan

```
@koc-architecture-reviewer Bu PR'daki değişiklikleri incele ve architecture.md'ye uygunluğunu kontrol et
```

### 7. Kalite Kontrol Listesi

Agent oluşturmadan önce:

- ✅ Net, spesifik açıklama
- ✅ Uygun tool seçimi (gereksiz tool yok)
- ✅ İyi tanımlanmış rol ve sınırlar
- ✅ Örneklerle somut talimatlar
- ✅ Çıktı format spesifikasyonları
- ✅ Handoff'lar (workflow parçasıysa)
- ✅ VS Code best practices ile uyumlu
- ✅ Test edilebilir tasarım

### 8. Projeye Entegrasyon

**Dosya Konumu:**

```
.github/agents/your-agent-name.agent.md
```

**Dosya Adlandırma:**

- kebab-case kullan
- Açıklayıcı isim ver
- Örnek: `koc-architecture-reviewer.agent.md`

**Instructions Dosyalarına Referans:**

```markdown
Bu agent, [architecture.md](.github/instructions/architecture.md) kurallarını takip eder.
```

**Tool Referansı:**

```markdown
#tool:grep_search kullanarak kod içinde pattern arar.
```

### 9. Örnek Agent Senaryoları (Koç Healthcare)

#### Senaryo 1: Architecture Compliance Reviewer

```
@custom-agent-foundry
Koç Mobile için architecture compliance checker agent yarat.
- architecture.md kurallarına uygunluk kontrol etsin
- PR'larda otomatik inceleme yapsın
- Violation'ları rapor etsin
- Sadece okuma yapabilsin, kod değiştirmesin
```

#### Senaryo 2: Feature Scaffolder

```
@custom-agent-foundry
Yeni feature oluşturmak için scaffolder agent yarat.
- Koç Mobile feature yapısını (screens, components, hooks, services, types.ts) otomatik oluştursun
- Boilerplate kod eklesin
- Navigation route'ları eklesin
- Redux slice template'i oluştursun
```

#### Senaryo 3: Security Auditor

```
@custom-agent-foundry
Mobile güvenlik audit agent yarat.
- API key, token, credential leak kontrolü yapsın
- Güvensiz native module kullanımı tespit etsin
- OWASP Mobile Top 10'a göre inceleme yapsın
- Güvenlik raporu oluştursun
```

### 10. Agent Chain Örneği

```
Planner Agent (@koc-planner)
    ↓
    → Feature Scaffolder Agent (@koc-scaffolder)
    ↓
    → Implementation Agent (@koc-implementer)
    ↓
    → Architecture Reviewer Agent (@koc-reviewer)
    ↓
    → Test Writer Agent (@koc-test-writer)
    ↓
    → Security Auditor Agent (@koc-security)
```

Her agent, bir sonrakine handoff yapar ve context'i taşır.

---

## Sonuç

Custom Agent Foundry kullanarak:

1. İhtiyacına özel agentlar yaratabilirsin
2. Workflow'ları otomatikleştirebilirsin
3. Koç Healthcare standartlarını enforce edebilirsin
4. Ekip verimliliğini artırabilirsin
5. Tutarlı kod kalitesi sağlayabilirsin

**Önemli:** Her agent, tek bir sorumluluğa odaklanmalı (Single Responsibility Principle), böylece zincirleme workflow'larda verimli çalışır.
