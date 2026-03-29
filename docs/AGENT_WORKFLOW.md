# Koç Mobile Custom Agent Workflow

> Accessibility standard source: [../.github/skills/wcag-2-2-mobile-aa/SKILL.md](../.github/skills/wcag-2-2-mobile-aa/SKILL.md)
>
> Policy: WCAG 2.2 AA (mobile-adapted), only for new/changed UI, soft gate at merge.

## 🏢 Dijital Şirket İşletim Modeli (Agentic Workflows)

## 📋 Tüm Agent'lar

Koç Mobile React Native ekibinin kullanabileceği 6 custom agent:

| Agent                        | Rol             | Ana Görev                               | Handoff                                                      |
| ---------------------------- | --------------- | --------------------------------------- | ------------------------------------------------------------ |
| **Architecture Planning**    | Tasarımcı       | Feature mimarisi planlaması             | → React Native Dev                                           |
| **React Native Developer**   | Geliştirici     | Kod yazma, implementasyon               | → Code Reviewer, Test Writer, Perf Opt, Merge Coordinator    |
| **Code Reviewer**            | İnceleyici      | Güvenlik, performans, kalite            | → React Native Dev, Test Writer, Perf Opt, Merge Coordinator |
| **Test Writer**              | Test Eksperi    | Unit/integration testleri               | → Code Reviewer, React Native Dev, Merge Coordinator         |
| **Performance Optimization** | Perf Eksperi    | Bundle, memory, rendering optimize      | → Test Writer, Code Reviewer, Merge Coordinator              |
| **Merge Coordinator**        | Release Manager | Branch, versioning, commit, push, PR aç | → Code Reviewer, Test Writer                                 |

---

## 🔗 Agent Network Görselleştirmesi

```
                    ┌─────────────────────────┐
                    │ ARCHITECTURE PLANNING   │
                    │ (Role: Architect)       │
                    │ Task: Design + Plan     │
                    └────────────┬────────────┘
                                 │
                ┌────────────────▼────────────────┐
                │   REACT NATIVE DEVELOPER        │
                │   (Role: Implementer)           │
                │   Task: Write Code              │
                └────┬────────────┬───────┬───┬──┘
                     │            │       │   │
        ┌────────────▼┐  ┌──────┤────┐  │   │
        │ CODE        │  │ TEST │    │  │   │
        │ REVIEWER    │  │WRITER│    │  │   │
        │ (Quality)   │  │(Valid)    │  │   │
        └───────┬─────┘  └────┬──────┘  │   │
                │             │        │   │
                │   ┌─────────▼────────┐   │
                │   │  PERFORMANCE     │   │
                │   │  OPTIMIZATION    │   │
                │   │  (Perf Expert)   │   │
                │   └────────┬─────────┘   │
                │            │             │
                └────┬───────▼─────────┬───┘
                     │                 │
                     ▼                 ▼
              ┌───────────────────────────────────┐
              │   MERGE COORDINATOR           │
              │   (Role: Release Manager)         │
              │   Task: Versioning + Branch Setup │
              └───────────┬───────────────────────┘
                          │
          ┌───────────────▼───────────────┐
          │  GITHUB PR CREATED            │
          │  Ready for merge to:          │
          │  🔵 dev / 🟡 uat / 🔴 prod    │
          └───────────────────────────────┘
```

---

## ✅ Kontrol Listesi

Tam Feature Development Cycle:

- [ ] **Planlama**: Architecture Planning agent ile mimarı tasarla
- [ ] **Geliştirme**: React Native Developer ile kod yaz
- [ ] **İnceleme**: Code Reviewer ile incelemen yap
- [ ] **Testing**: Test Writer ile kapsamlı test yaz
- [ ] **Optimizasyon**: Performance Optimization ile performansı optimize et
- [ ] **Merge & Release**: Merge Coordinator ile:
  - [ ] Branch naming doğru
  - [ ] Versioning (Android + iOS) güncellendi
  - [ ] CHANGELOG üretildi
  - [ ] Merge checklist tamamlandı
  - [ ] Merge target seçildi
  - [ ] PR description hazır
- [ ] **Merge**: GitHub PR approved + merged
- [ ] **Deploy**: Uygun ortama deploy (dev/uat/prod)

---

## 🚀 Özet

Bu 6-agent sistem **tam otomatik development lifecycle** sağlar:

1. **Plan** → Architecture Planning
2. **Build** → React Native Developer
3. **Review** → Code Reviewer
4. **Test** → Test Writer
5. **Optimize** → Performance Optimization
6. **Release** → Merge Coordinator

Hepsi handoff'lar ile bağlı, seamless workflow oluşturur. Her agent zamanında handoff yaparak sonraki adıma geçer. Sonuç: **Production-ready code**, **documented changes**, **verified quality**.

## 🎨 Local Figma MCP Kurulumu (VS Code Chat)

Bu kurulumun amacı: Chat'e attığın Figma linkini agent'ın doğrudan okuyup ekran/component/token bilgisini çekebilmesi.

Bu repo için workspace bazlı MCP konfigürasyonu eklendi:

- [../.vscode/mcp.json](../.vscode/mcp.json)

### İlk kullanım

1. VS Code içinde `MCP: List Servers` komutunu çalıştır.
2. `figmaContext` server'ını `Start` et.
3. İlk start'ta `Figma Personal Access Token` sorulacak, token'ı gir.
4. Chat'te bir Figma file linki at ve örnek prompt çalıştır:
   - `Bu Figma linkindeki ana ekranın component hiyerarşisini çıkar ve React Native ekran iskeletini oluştur.`

### Kurarken yaptığımız işlemler (adım adım)

1. Figma token scope'larını minimum yetkiyle belirledik.
   - Zorunlu: `Files -> Read the contents and render images`
   - Zorunlu: `Files -> Read metadata`
   - Opsiyonel: `Design systems read` (library kullanılıyorsa)
2. VS Code workspace MCP dosyasını oluşturduk: [../.vscode/mcp.json](../.vscode/mcp.json)
3. `figmaContext` adında local `stdio` MCP server tanımladık.
   - `command`: `npx`
   - `args`: `-y @tmegit/figma-developer-mcp --figma-api-key=${input:figma-api-key-v2} --stdio`
4. Token'ı düz metin yazmamak için `inputs.promptString(password: true)` kullandık.
5. Güvenlik için sandbox açtık ve network erişimini `api.figma.com` ile sınırlandırdık.
6. Lokal smoke test yaptık; server'ın ayağa kalktığını doğruladık.
7. Figma linki ile MCP çağrısı (`fileKey + nodeId`) çalıştırıp frame/component özetini aldık.

### Önerilen günlük akış (on-demand)

1. Projeyi aç (Figma server kapalı kalabilir).
2. Figma linki geldiğinde `figmaContext` server'ını `Start` et.
3. Linki chat'e atıp analiz/plan/develop isteğini ver.
4. İş tamamlanınca server'ı `Stop` et (opsiyonel ama temiz kullanım).

##### GH Actions Workflow'ları ve Custom Agent'lar birlikte çalışarak şirket içi dijital operasyon modelini oluşturur. Agent'lar bireysel görevleri yerine getirirken, workflow'lar bu görevlerin ne zaman ve nasıl tetikleneceğini, hangi araçların kullanılacağını ve güvenli çıktıların nasıl yönetileceğini belirler.

Bu yapıda iki katman birlikte çalışır:

1. **Custom Agent'lar** (`.github/agents/`) → Şirket çalışanları (Architect, Developer, Reviewer, Tester)
2. **Agentic Workflow'lar** (`.github/workflows/`) → Şirket operasyon sistemi (iş dağıtımı, kontrol, raporlama)

### Neden bu komutları çalıştırıyoruz?

Workflow lifecycle komutları aşağıdaki işlevleri sağlar:

- `gh aw compile --validate --strict`

  - Ne yapar: Workflow kaynak dosyalarını (`*.md`) derleyip çalıştırılabilir `*.lock.yml` üretir.
  - Şirket analojisi: Yazılan süreç politikasını "resmi operasyon prosedürü" haline getirir.

- `gh aw run mobile-pr-gate`

  - Ne yapar: Seçilen workflow'u gerçek bir GitHub Actions run'ı olarak başlatır.
  - Şirket analojisi: Kalite ekibine "bu PR'ı denetle" görevi açar.

- `gh aw health --days 7`

  - Ne yapar: Son 7 gündeki workflow başarı oranını, trendini ve ortalama metrikleri çıkarır.
  - Şirket analojisi: Haftalık operasyon sağlığı/KPI raporudur.

- `gh aw logs mobile-pr-gate --parse`

  - Ne yapar: Çalışan run'ların loglarını indirir ve okunabilir özet çıkarır.
  - Şirket analojisi: Bir departmanın yaptığı işin detaylı faaliyet kaydıdır.

- `gh aw audit <run-id>`
  - Ne yapar: Belirli bir run'ı hata, araç kullanımı, güvenlik ve akış açısından analiz eder.
  - Şirket analojisi: İç denetim (audit) ve postmortem incelemesidir.

### Bu yapı pratikte nasıl çalışır?

1. **Süreç tanımlanır**
   - `.github/workflows/mobile-*.md` dosyalarında neyin kontrol edileceği yazılır.
2. **Süreç üretime alınır**
   - `compile/validate/strict` ile lock dosyaları üretilir.
3. **Operasyon tetiklenir**
   - PR, issue veya manuel run ile workflow başlar.
4. **Ajanlar işi yapar**
   - Kod/PR/issue bağlamı analiz edilir, sonuç üretilir.
5. **Güvenli çıktı uygulanır**
   - `safe-outputs` ile yorum, issue, label gibi aksiyonlar kontrollü uygulanır.
6. **Performans izlenir**
   - `health`, `logs`, `audit` ile kalite ve süreklilik ölçülür.

### Günlük Kullanım Kılavuzu

#### 1) Workflow güncelle

- Dosya: `.github/workflows/*.md`
- Amaç: Kuralı/prosedürü güncellemek

#### 2) Derle ve doğrula

- Komut: `gh aw compile --validate --strict`
- Beklenen sonuç: İlgili `*.lock.yml` dosyaları güncellenir

#### 3) Çalıştır

- Komut: `gh aw run mobile-pr-gate`
- Beklenen sonuç: Bir run ID oluşur

#### 4) İzle

- Komutlar:
  - `gh aw health --days 7`
  - `gh aw logs mobile-pr-gate --parse`
  - `gh aw audit <run-id>`

### Mobilden platforma evrim mantığı

Bugünkü yapı mobile odaklı bir "pilot domain"dir. Yarın backend eklendiğinde model değişmez:

- Yeni agent seti (`backend-developer`, `backend-reviewer`, vb.)
- Yeni domain workflow'ları (`backend-pr-gate`, `backend-release-readiness`, vb.)
- Ortak orchestrator ile domain bazlı dispatch

Bu sayede şirket modeli şu hale gelir:

- **Çalışanlar (agent)** değişebilir,
- **Operasyon sistemi (workflow)** ölçeklenebilir,
- **Yönetim metrikleri (health/logs/audit)** merkezi kalır.
