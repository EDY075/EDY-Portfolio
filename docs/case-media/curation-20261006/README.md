# Curated case evidence

Prepared on 2026-10-06. These files contain real application screenshots or
explicitly identified compositions of real screenshots. They are evidence for
case galleries, not generated reconstructions of application UI.

| File | Native dimensions | Source | Public caption context |
| --- | --- | --- | --- |
| `crm-preview.jpg` | 1732 x 809 | `../../../../EDY-CRM-Public/docs/images/previa-desktop.jpg` | Local HTML preview inside the real CRM. Casa Aurora is a fictitious demo company; the page is a deterministic local template, not evidence of a new AI inference. |
| `crm-gallery.jpg` | 1574 x 1973 | `../../../../EDY-CRM-Public/docs/images/galeria-desktop.jpg` | Real visual-proposal gallery with fictitious demo data and explicitly imported candidate studies. |
| `soc-command.png` | 2672 x 1640 | `../../../../EDY-SOC-Analytics/screenshots/desktop-final/1. Command Center.png` | Real Power BI Command Center. All dataset values, assets and incidents are synthetic. |
| `soc-quality.png` | 2672 x 1640 | `../../../../EDY-SOC-Analytics/screenshots/desktop-final/8. Data Quality.png` | Real Power BI Data Quality page with synthetic data, lineage and source classification. No operational telemetry is included. |
| `shadowcat-evidence.png` | 1800 x 942 | `../../../../EDY-SHADOWCAT/linkedin-post/04-shadowcat-ai-evidence.png` | Approved composition of two real screens: SHADOWCAT AI and Evidence Store. Only an isolated synthetic investigation is shown; the application remains private. |
| `shadowcat-reports.png` | 1800 x 942 | `../../../../EDY-SHADOWCAT/linkedin-post/05-tools-reports.png` | Approved composition of two real screens: tool catalog and local reports. Integration status is not a promise of access to every provider. |
| `fitness-modalities.png` | 1440 x 877 | `https://cr-fitness-academia.pages.dev/`, section `#modalidades` | Real screenshot of the published website on 2026-10-06. The six modality images are generated visual assets within the real site, not original documentary photographs. |
| `fitness-plans.png` | 1440 x 686 | `https://cr-fitness-academia.pages.dev/`, section `#planos` | Real screenshot of the published website on 2026-10-06. Prices and conditions reproduce that capture; current terms must be confirmed directly with the academy. |

## Verification and privacy

The six local sources were inspected before copying and copied byte for byte.
CRM approval/context: `EDY-CRM-Public/docs/DEMONSTRACAO.md` and `CASE-STUDY.md`.
SOC provenance: `EDY-SOC-Analytics/docs/DATA_LINEAGE.md` and `PAGES_GUIDE.md`.
SHADOWCAT approval: `EDY-SHADOWCAT/docs/security/PUBLICATION_AUDIT.md`.

CR Fitness was captured in isolated headless Chrome with a 1440 x 900 viewport,
device scale factor 1 and reduced motion. Native section screenshots preserve
each section's actual dimensions. Fonts were ready and all relevant images were
decoded before capture. There were no page errors or HTTP responses >= 400.
Only the fixed public URL, scrolling and screenshot capture were used: no
forms, messages, login or DOM/content changes.

No operational database, credentials, private account session, client record,
private conversation or personal-assistant production capture was accessed.
