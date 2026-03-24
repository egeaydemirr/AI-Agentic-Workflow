# Figma MCP Setup (VS Code + GitHub Copilot)

Bu doküman, bir developer'ın Figma MCP bağlantısını hızlıca kurup doğrulaması için hazırlanmıştır.

## 1) Ön Koşullar

- VS Code (güncel sürüm)
- GitHub Copilot Chat aktif
- Node.js 18+ ve `npx`
- Figma hesabı ve erişim izni olan dosya

## 2) Figma Token Oluşturma

Figma'da şu adımları izleyin:

1. **Figma → Settings → Security → Personal access tokens**
2. Yeni token oluşturun
3. En az şu izinleri verin:
   - `Files: Read the contents of and render images from files`
   - `Files: Read metadata of files`
   - `Design systems: Read data about individual components and styles`

> Not: En güvenli yaklaşım sadece gerekli **read** izinlerini vermektir.

## 3) MCP Konfigürasyonu

MCP ayarını **user settings.json** yerine aşağıdaki dosyaya yazın:

- `~/Library/Application Support/Code/User/mcp.json`

Örnek içerik:

```jsonc
{
  "servers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=FIGMA_TOKEN_BURAYA"
      ],
      "type": "stdio"
    }
  },
  "inputs": []
}
```

## 4) VS Code Yeniden Yükleme

1. `Cmd + Shift + P`
2. `Developer: Reload Window`

İlk açılışta MCP server başlatma birkaç saniye sürebilir.

## 5) Test Senaryosu

### Senaryo A - Bağlantı doğrulama

Copilot Chat'e yazın:

```text
Figma dosyasını oku: https://www.figma.com/design/<FILE_KEY>/<FILE_NAME>?node-id=0-1
```

**Beklenen sonuç:**

- Dosya adı okunur
- Sayfa veya frame listesi döner
- Yetki hatası alınmaz

### Senaryo B - Ekran listesi doğrulama

Copilot Chat'e yazın:

```text
Bu Figma dosyasındaki tüm top-level frame isimlerini listele.
```

**Beklenen sonuç:**

- Frame/screen isimleri sırayla listelenir
- Ekran sayısı tasarımla tutarlı olur

## 6) Hızlı Sorun Giderme

- Token yanlış/expired ise yeni token üretip `mcp.json` içindeki değerle değiştirin.
- Dosya erişimi yoksa Figma'da ilgili dosya/team erişimini kontrol edin.
- MCP açılışta bekliyorsa birkaç saniye sonra tekrar deneyin ve pencereyi yeniden yükleyin.
