# Koç Mobile Custom Agent Workflow

> Accessibility standard source: [../.github/skills/wcag-2-2-mobile-aa/SKILL.md](../.github/skills/wcag-2-2-mobile-aa/SKILL.md)
>
> Policy: WCAG 2.2 AA (mobile-adapted), only for new/changed UI, soft gate at merge.

## 🏢 Dijital Şirket İşletim Modeli (Agentic Workflows)

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

## 📊 Detailed Workflow Steps

### Phase 1: Planning (Architecture Planning Agent)

```
INPUT: "Home sayfasına ürün listesi ekle"
  ↓
[1] Feature scope belirle
    - Kaç screen gereken?
    - Hangi components paylaşılabilir?
    - Database/API calls var mı?

[2] Mimarsi tasarla
    - src/features/product-list/ structure
    - Redux state management
    - RTK Query endpoints
    - Navigation flow

[3] Bağımlılıkları map et
    - Shared components
    - Shared hooks
    - Services/API calls
    - Cross-feature imports? (hata!)

[4] Test stratejisini planla
    - Unit test hangileri?
    - Integration test hangileri?
    - Mock strategy nedir?

[5] Erişilebilirlik planını ekle
    - Skill checklist maddeleri
    - Ekran bazlı acceptance criteria
    - Kapsam: sadece yeni/değişen UI

OUTPUT: Comprehensive architecture plan
  → React Native Developer ile handoff
```

### Phase 2: Implementation (React Native Developer)

```
INPUT: Architecture plan
  ↓
[1] Feature structure oluştur
    - src/features/product-list/ kurulumu
    - types.ts yazma
    - index.ts barrel export

[2] API/Services tanımla
    - RTK Query endpoints
    - Mock data
    - Error handling

[3] Screens yazma
    - ProductListScreen
    - ProductDetailsScreen
    - Navigation integration

[4] Components yazma
    - ProductCard
    - FilterBar
    - PaginationControl

[5] Hooks yazma
    - useProducts()
    - useProductFilters()
    - useProductSearch()

[6] Tests çalıştır
    - yarn test
    - All passing?

[7] Handoff seçenekleri
    ├→ "Test ekle" → Test Writer
    ├→ "Code review" → Code Reviewer
    ├→ "Performance kontrol" → Performance Opt
    └→ "Merge hazırla" → Merge Coordinator

OUTPUT: Working feature code
  → Multiple handoff options
```

### Phase 3: Testing (Test Writer)

```
INPUT: Implementation + architecture plan
  ↓
[1] Test strategy gözden geçir
    - Ne test edilecek?
    - Mock boundaries?

[2] Unit testleri yaz
    - Hooks testleri
    - Selectors testleri
    - Utils testleri
    - >80% coverage

[3] Integration testleri yaz
    - Screen rendering
    - User interactions
    - API mocking
    - Error scenarios

[4] Testleri çalıştır
    - yarn test
    - All passing?
    - Snapshot updates needed?

[5] A11y kanıtı üret
    - Otomatik testlenen kriterler
    - Manüel doğrulanan kriterler
    - İstisnalar + risk + takip aksiyonu

[5] Handoff seçenekleri
    ├→ "Code review tests" → Code Reviewer
    ├→ "Implement feature" → React Native Dev (failing tests)
    └→ "Merge prep" → Merge Coordinator

OUTPUT: Comprehensive test suite
  → Multiple handoff options
```

### Phase 4: Code Review (Code Reviewer)

```
INPUT: Code + tests + architecture plan
  ↓
[1] Güvenlik taraması
    - Hardcoded secrets?
    - Input validation?
    - Network security?

[2] Performans kontrol
    - Re-render analizи
    - Bundle size
    - Memory leaks?

[3] Mimari uygunluk
    - Architecture.md kurallara uygun?
    - Feature boundaries?
    - Circular imports?

[4] Kod kalitesi
    - TypeScript hataları?
    - DRY principle?
    - Naming conventions?

[5] Findingsleri rapor et
    - Critical issues: FIX NOW
    - High: Fix soon
    - Medium: Fix in review
    - Low: Nice to have

[6] Accessibility soft gate özeti ekle
    - PASS / PASS WITH EXCEPTIONS / FAIL
    - Karşılanmayan kriter + mitigation + owner/date

[6] Handoff seçenekleri
    ├→ "Performance issues" → Performance Opt
    ├→ "Test gap" → Test Writer
    ├→ "Apply fixes" → React Native Dev
    └→ "Merge prep" → Merge Coordinator

OUTPUT: Code review findings + approval
  → Multiple handoff options
```

### Phase 5: Performance Optimization (Performance Optimization)

```
INPUT: Code + performance findings
  ↓
[1] Bundle analizi
    - Size report
    - Tree-shaking opportunities
    - Code splitting

[2] Rendering kontrol
    - React DevTools profiler
    - Unnecessary re-renders?
    - Memoization needs

[3] Memory analizi
    - Leaks?
    - Image optimization
    - State management

[4] Optimization önerileri
    - useCallback/useMemo
    - FlatList optimization
    - Lazy loading

[5] Implement optimizations
    - Code changes
    - Before/after metrics

[6] Handoff seçenekleri
    ├→ "Tests regression" → Test Writer
    ├→ "Code review final" → Code Reviewer
    └→ "Merge prep" → Merge Coordinator

OUTPUT: Optimized code + metrics
  → Multiple handoff options
```

### Phase 6: Merge & Release (Merge Coordinator)

```
INPUT: Finalized code + tests + reviews
  ↓
═══════════════════════════════════════════════════════
[1] BRANCH VALIDATION
───────────────────────────────────────────────────────
    Q: Branch type? → feature/bugfix/hotfix/...
    Q: Feature name? → kebab-case
    ✓ Validate: feature/product-list-pagination
    ✓ Check git log: conventional commits? ✓

[2] VERSIONING - Android
───────────────────────────────────────────────────────
    Q: Release type? → major/minor/patch
    Recent: 1.2.3 (code: 123)
    New: 1.3.0 (code: 130)
    ✓ Update android/app/build.gradle
    ✓ versionName: "1.3.0"
    ✓ versionCode: 130

[3] VERSIONING - iOS
───────────────────────────────────────────────────────
    ✓ Match Android version: 1.3.0
    ✓ Match Android code: 130
    ✓ Update ios/KocMobileArchitecture/Info.plist
    ✓ CFBundleShortVersionString: "1.3.0"
    ✓ CFBundleVersion: "130"

[4] CHANGELOG GENERATION
───────────────────────────────────────────────────────
    ✓ Parse commits (feat, fix, perf, breaking)
    ✓ Group by type
    ✓ Update CHANGELOG.md with [1.3.0] - 2026-03-05

    Added:
    - feat(home): Product list with pagination
    - feat(home): Filter and search functionality

    Fixed:
    - fix(navigation): TypeScript error

    Changed:
    - perf(images): Lazy load product images

[5] PRE-MERGE CHECKLIST ✓
───────────────────────────────────────────────────────
    ☑ Code Quality: No console.log, no @ts-ignore
    ☑ Testing: yarn test pass, >80% coverage
    ☑ Performance: Bundle +40KB (OK), no leaks
    ☑ Security: yarn audit pass, no secrets
    ☑ A11y: Skill checklist + soft gate çıktısı mevcut
    ☑ Documentation: CHANGELOG updated, comments
    ☑ Git: Commits clean, branch name valid

[6] MERGE TARGET DECISION
───────────────────────────────────────────────────────
    Q: Where to merge?

    🔵 dev
       └─ For daily builds & testing
       └─ Req: Build pass, basic tests OK
       └─ Deploy: Internal staging

    🟡 uat
       └─ For QA & client testing
       └─ Req: Full test suite, perf OK
       └─ Deploy: QA environment

    🔴 prod
       └─ For app store release
       └─ Req: All pass, security OK, CHANGELOG
       └─ Deploy: Google Play + App Store

    Selected: 🟡 uat

[7] PR DESCRIPTION GENERATION
───────────────────────────────────────────────────────
    ## Description
    Added product list feature to Home screen with pagination,
    filtering, and search functionality.

    ## Changes
    - New ProductList screen with pagination
    - Filter and search hooks
    - RTK Query endpoints
    - Mock data for development

    ## Testing
    - Load 1000+ products ✓
    - Pagination working ✓
    - Search functionality ✓
    - Network errors handled ✓

    ## Performance
    - Bundle: +40KB (acceptable)
    - Using FlashList for virtualization
    - Images lazy loaded

    ## Checklist
    - [x] Tests pass (yarn test)
    - [x] No console.log in production
    - [x] CHANGELOG updated
    - [x] Accessibility verified
    - [x] Architecture compliant

═══════════════════════════════════════════════════════

[8] FINAL CONFIRMATION
    Q: Ready to merge?
    ✓ Show merge diff
    ✓ Create PR with all details

OUTPUT: PR ready for merge
  → GitHub PR created
  → Ready for approval
```

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
