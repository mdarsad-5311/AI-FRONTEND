import { DocumentItem, ActivityItem, DashboardStats } from "@/types/document";

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    title: "Global Enterprise Master Services Agreement",
    filename: "MSA_AcmeCorp_Enterprise_2026.pdf",
    fileSize: "2.4 MB",
    pageCount: 3,
    documentType: "Master Services Agreement",
    uploadedAt: "2026-10-06T14:32:00Z",
    status: "ready",
    riskScore: 78,
    riskLevel: "HIGH",
    analysis: {
      id: "ana-1",
      documentId: "doc-1",
      documentType: "Master Services Agreement",
      summary: "This agreement contains several clauses that create material commercial and legal exposure, particularly around uncapped liability exclusions, unilateral termination rights without severance/unwinding fees, and broad works-made-for-hire assignment that threatens background IP.",
      keyConcerns: [
        "Uncapped liability for confidentiality and indemnification under Section 12.2 carves out claims from the master fee limit.",
        "Overly broad IP assignment in Section 9.4 transfers vendor core framework modifications to the client.",
        "Asymmetrical 14-day cancellation without compensation for committed engineering capacity."
      ],
      businessImpactSummary: "Severe downside exposure in litigation or cybersecurity incidents; potential forfeiture of reusable software accelerators.",
      parties: ["Acme Global Logistics Inc.", "OmniTech Solutions Corp."],
      effectiveDate: "November 1, 2026",
      governingLaw: "State of Delaware, USA",
      riskScore: 78,
      aiConfidence: 94,
      findingsBreakdown: {
        total: 5,
        critical: 1,
        high: 1,
        medium: 1,
        low: 2
      },
      clauses: [
        {
          id: "cl-1",
          sectionNumber: "12.2",
          title: "Section 12.2 - Indemnification Cap Exclusions",
          category: "Liability",
          pageNumber: 2,
          snippet: "Neither party's liability under Section 11 (Confidentiality) or Section 12 (Indemnification) shall be subject to any monetary cap or aggregate liability limitations.",
          riskLevel: "HIGH",
          riskScore: 88,
          confidence: 96,
          explanation: "Carves out confidentiality, data security, and indemnification breaches from the standard 12-month aggregate fee cap, creating open-ended financial exposure in standard commercial operations.",
          businessImpact: "Exposes enterprise to unlimited commercial litigation damages and disproportionate third-party indemnification payouts without catastrophic threshold limitations.",
          recommendedAction: "Insert mutual super-cap explicitly restricted to two times (2x) the trailing 12-month contract fees paid under the applicable SOW.",
          suggestedRedline: "Neither party's aggregate liability under Section 11 or Section 12 shall exceed two times (2x) the total fees paid or payable by Client under the applicable SOW in the twelve (12) months preceding the claim."
        },
        {
          id: "cl-2",
          sectionNumber: "14.1",
          title: "Section 14.1 - Unilateral Termination for Convenience",
          category: "Termination",
          pageNumber: 3,
          snippet: "Client may terminate this Agreement and any active Statement of Work immediately upon 14 days written notice without penalty or early termination fees.",
          riskLevel: "MEDIUM",
          riskScore: 58,
          confidence: 92,
          explanation: "Client holds unilateral discretion to cancel ongoing project engagements without compensating for committed infrastructure, dedicated staffing, or sunk onboarding investments.",
          businessImpact: "Operational margin volatility and stranded resource overhead if high-capital deployments are abruptly cancelled midway through delivery.",
          recommendedAction: "Negotiate minimum 45-day prior written notice requirement plus mandatory reimbursement of unamortized development hardware and non-cancelable third-party licenses.",
          suggestedRedline: "Client may terminate this Agreement upon forty-five (45) days prior written notice, subject to payment of all completed milestones and non-cancelable third-party commitments incurred through termination date."
        },
        {
          id: "cl-3",
          sectionNumber: "9.4",
          title: "Section 9.4 - Pre-existing IP & Derivative Works",
          category: "Intellectual Property",
          pageNumber: 2,
          snippet: "All custom developments, including modifications to Vendor Core Frameworks developed during this project, shall be deemed works made for hire and owned exclusively by Client.",
          riskLevel: "CRITICAL",
          riskScore: 95,
          confidence: 98,
          explanation: "Language establishes that any modular enhancements, adapters, or architectural extensions to vendor background frameworks become exclusive client property as works made for hire.",
          businessImpact: "Risk of forfeiting proprietary foundational software accelerators, creating IP contamination that could paralyze core platform reusability across other clients.",
          recommendedAction: "Strike 'modifications to Vendor Core Frameworks' from works made for hire and insert Schedule D retaining Vendor Background IP with non-exclusive client runtime license.",
          suggestedRedline: "Custom deliverables created solely for Client shall be owned by Client. Provided, however, Vendor retains exclusive ownership of all Vendor Pre-Existing IP, core frameworks, and generalized enhancements thereof."
        },
        {
          id: "cl-4",
          sectionNumber: "3.2",
          title: "Section 3.2 - Service Deliverables & Acceptance Testing",
          category: "Compliance",
          pageNumber: 1,
          snippet: "Customer shall have forty-five (45) business days following receipt of each Milestone Deliverable to conduct User Acceptance Testing against technical specifications.",
          riskLevel: "LOW",
          riskScore: 24,
          confidence: 89,
          explanation: "Lengthy acceptance testing window that requires formal written sign-off before invoice generation.",
          businessImpact: "Potential minor delay in milestone billing cycles if testing feedback is prolonged.",
          recommendedAction: "Include deemed acceptance clause if customer fails to submit documented deficiency notice within 15 business days.",
          suggestedRedline: "Deliverables shall be deemed accepted if Customer does not provide written notification of non-conformities within fifteen (15) business days of delivery."
        },
        {
          id: "cl-5",
          sectionNumber: "16.4",
          title: "Section 16.4 - Governing Law & Venue Jurisdiction",
          category: "Compliance",
          pageNumber: 3,
          snippet: "This Agreement shall be governed by Delaware law with exclusive dispute jurisdiction in the Delaware Court of Chancery.",
          riskLevel: "LOW",
          riskScore: 18,
          confidence: 95,
          explanation: "Standard well-defined commercial arbitration and corporate litigation forum.",
          businessImpact: "Neutral, predictable judicial interpretation with established precedent for technology transactions.",
          recommendedAction: "Maintain as standard enterprise jurisdiction.",
          suggestedRedline: "Retain current Delaware choice of law and Chancery Court forum selection."
        }
      ],
      risks: [
        {
          id: "rk-1",
          title: "IP Contamination of Core Frameworks",
          severity: "CRITICAL",
          riskScore: 95,
          confidence: 98,
          pageNumber: 2,
          description: "Clause 9.4 designates modifications to vendor foundational frameworks as works made for hire transferred exclusively to client.",
          clauseRef: "Section 9.4",
          affectedClauseId: "cl-3",
          businessImpact: "Risk of forfeiting foundational software accelerators and core architectural IP.",
          mitigation: "Carve out vendor background technology and limit client assignment strictly to client-specific data models and custom reports."
        },
        {
          id: "rk-2",
          title: "Unlimited Liability for Data & Security Incidents",
          severity: "HIGH",
          riskScore: 88,
          confidence: 96,
          pageNumber: 2,
          description: "No aggregate ceiling or monetary cap on indemnity obligations or confidentiality breaches under Section 12.2.",
          clauseRef: "Section 12.2",
          affectedClauseId: "cl-1",
          businessImpact: "Uncapped exposure in the event of third-party indemnification or data incident claims.",
          mitigation: "Negotiate a distinct liability super-cap tied to 2x annual contract value for confidentiality and security claims."
        },
        {
          id: "rk-3",
          title: "Asymmetrical 14-Day Cancellation Window",
          severity: "MEDIUM",
          riskScore: 58,
          confidence: 92,
          pageNumber: 3,
          description: "Client may terminate active SOWs with only 14 days notice and zero break fees, creating revenue cliff risks.",
          clauseRef: "Section 14.1",
          affectedClauseId: "cl-2",
          businessImpact: "Unamortized engineering overhead and sudden project descheduling without recourse.",
          mitigation: "Extend notice to 45 days and require payment for all milestone work-in-progress plus committed expenses."
        }
      ],
      recommendations: [
        {
          id: "rec-1",
          title: "Amend IP Clause 9.4 with Background IP Schedule",
          priority: "High",
          suggestedAction: "Attach Schedule D defining Vendor Pre-Existing IP as sole property of Vendor.",
          rationale: "Prevents loss of core technology, accelerators, and foundational intellectual property."
        },
        {
          id: "rec-2",
          title: "Revise Section 12.2 Liability Limits",
          priority: "High",
          suggestedAction: "Insert mutual aggregate liability limitation capped at 24 months of fees paid.",
          rationale: "Aligns risk exposure with enterprise cybersecurity insurance coverage limits."
        },
        {
          id: "rec-3",
          title: "Expand Termination Notice Horizon",
          priority: "Medium",
          suggestedAction: "Require 45 days written notice and pro-rata work reimbursement.",
          rationale: "Safeguards engineering staff commitments and prevents unexpected budget loss."
        }
      ],
      analyzedAt: "2026-10-06T14:35:12Z"
    },
    sections: [
      {
        id: "sec-1",
        title: "Parties & Recitals",
        sectionNumber: "1.0",
        pageNumber: 1,
        clauses: []
      },
      {
        id: "sec-2",
        title: "Scope & Deliverables",
        sectionNumber: "3.0",
        pageNumber: 1,
        clauses: [
          {
            id: "cl-4",
            sectionNumber: "3.2",
            title: "Section 3.2 - Service Deliverables & Acceptance Testing",
            category: "Compliance",
            pageNumber: 1,
            snippet: "Customer shall have forty-five (45) business days following receipt of each Milestone Deliverable to conduct User Acceptance Testing against technical specifications.",
            riskLevel: "LOW",
            riskScore: 24,
            confidence: 89,
            explanation: "Lengthy acceptance testing window that requires formal written sign-off before invoice generation.",
            businessImpact: "Potential minor delay in milestone billing cycles if testing feedback is prolonged.",
            recommendedAction: "Include deemed acceptance clause if customer fails to submit documented deficiency notice within 15 business days."
          }
        ]
      },
      {
        id: "sec-3",
        title: "Intellectual Property Ownership",
        sectionNumber: "9.0",
        pageNumber: 2,
        clauses: [
          {
            id: "cl-3",
            sectionNumber: "9.4",
            title: "Section 9.4 - Pre-existing IP & Derivative Works",
            category: "Intellectual Property",
            pageNumber: 2,
            snippet: "All custom developments, including modifications to Vendor Core Frameworks developed during this project, shall be deemed works made for hire and owned exclusively by Client.",
            riskLevel: "CRITICAL",
            riskScore: 95,
            confidence: 98,
            explanation: "Language establishes that any modular enhancements, adapters, or architectural extensions to vendor background frameworks become exclusive client property as works made for hire.",
            businessImpact: "Risk of forfeiting proprietary foundational software accelerators, creating IP contamination that could paralyze core platform reusability across other clients.",
            recommendedAction: "Strike 'modifications to Vendor Core Frameworks' from works made for hire and insert Schedule D retaining Vendor Background IP with non-exclusive client runtime license."
          }
        ]
      },
      {
        id: "sec-4",
        title: "Indemnification & Liability Limits",
        sectionNumber: "12.0",
        pageNumber: 2,
        clauses: [
          {
            id: "cl-1",
            sectionNumber: "12.2",
            title: "Section 12.2 - Indemnification Cap Exclusions",
            category: "Liability",
            pageNumber: 2,
            snippet: "Neither party's liability under Section 11 (Confidentiality) or Section 12 (Indemnification) shall be subject to any monetary cap or aggregate liability limitations.",
            riskLevel: "HIGH",
            riskScore: 88,
            confidence: 96,
            explanation: "Carves out confidentiality, data security, and indemnification breaches from the standard 12-month aggregate fee cap, creating open-ended financial exposure in standard commercial operations.",
            businessImpact: "Exposes enterprise to unlimited commercial litigation damages and disproportionate third-party indemnification payouts without catastrophic threshold limitations.",
            recommendedAction: "Insert mutual super-cap explicitly restricted to two times (2x) the trailing 12-month contract fees paid under the applicable SOW."
          }
        ]
      },
      {
        id: "sec-5",
        title: "Term & Termination",
        sectionNumber: "14.0",
        pageNumber: 3,
        clauses: [
          {
            id: "cl-2",
            sectionNumber: "14.1",
            title: "Section 14.1 - Unilateral Termination for Convenience",
            category: "Termination",
            pageNumber: 3,
            snippet: "Client may terminate this Agreement and any active Statement of Work immediately upon 14 days written notice without penalty or early termination fees.",
            riskLevel: "MEDIUM",
            riskScore: 58,
            confidence: 92,
            explanation: "Client holds unilateral discretion to cancel ongoing project engagements without compensating for committed infrastructure, dedicated staffing, or sunk onboarding investments.",
            businessImpact: "Operational margin volatility and stranded resource overhead if high-capital deployments are abruptly cancelled midway through delivery.",
            recommendedAction: "Negotiate minimum 45-day prior written notice requirement plus mandatory reimbursement of unamortized development hardware and non-cancelable third-party licenses."
          }
        ]
      },
      {
        id: "sec-6",
        title: "Governing Law & Disputes",
        sectionNumber: "16.0",
        pageNumber: 3,
        clauses: [
          {
            id: "cl-5",
            sectionNumber: "16.4",
            title: "Section 16.4 - Governing Law & Venue Jurisdiction",
            category: "Compliance",
            pageNumber: 3,
            snippet: "This Agreement shall be governed by Delaware law with exclusive dispute jurisdiction in the Delaware Court of Chancery.",
            riskLevel: "LOW",
            riskScore: 18,
            confidence: 95,
            explanation: "Standard well-defined commercial arbitration and corporate litigation forum.",
            businessImpact: "Neutral, predictable judicial interpretation with established precedent for technology transactions.",
            recommendedAction: "Maintain as standard enterprise jurisdiction."
          }
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        headerTitle: "MASTER SERVICES AGREEMENT — PARTIES & OPERATIONAL SCOPE",
        paragraphs: [
          {
            id: "p1-1",
            text: "MASTER SERVICES AGREEMENT",
            isHeading: true,
            headingLevel: 1
          },
          {
            id: "p1-2",
            text: "This Master Services Agreement (\"Agreement\") is entered into and made effective as of November 1, 2026 (\"Effective Date\"), by and between Acme Global Logistics Inc., a Delaware corporation having its principal office at 400 Continental Blvd, Suite 800, El Segundo, CA 90245 (\"Customer\"), and OmniTech Solutions Corp., a Delaware corporation with its corporate office at 100 Innovation Way, Austin, TX 78701 (\"Vendor\"). Customer and Vendor may each be referred to herein individually as a \"Party\" and collectively as the \"Parties\"."
          },
          {
            id: "p1-3",
            text: "RECITALS",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p1-4",
            text: "WHEREAS, Vendor possesses specialized expertise in cloud platform engineering, distributed microservice architecture, and enterprise software integration; and WHEREAS, Customer desires to retain Vendor to perform custom engineering services and deliverables under one or more Statements of Work (\"SOW\"), and Vendor agrees to perform such services under the terms and covenants set forth herein."
          },
          {
            id: "p1-5",
            text: "SECTION 3.0 — SCOPE OF SERVICES & MILESTONES",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p1-6",
            text: "3.1 Statements of Work. All services, tasks, timelines, staffing allocations, and fees shall be documented in individually executed Statements of Work. Each SOW shall constitute a separate contract governed by this Agreement."
          },
          {
            id: "p1-7",
            text: "3.2 Service Deliverables & Acceptance Testing. Customer shall have forty-five (45) business days following receipt of each Milestone Deliverable to conduct User Acceptance Testing against technical specifications set forth in the applicable Statement of Work. In the event Customer identifies non-conformities, Customer shall provide itemized written notice to Vendor detailing specific variance criteria.",
            clauseId: "cl-4",
            riskLevel: "LOW"
          }
        ]
      },
      {
        pageNumber: 2,
        headerTitle: "MASTER SERVICES AGREEMENT — INTELLECTUAL PROPERTY & INDEMNIFICATION",
        paragraphs: [
          {
            id: "p2-1",
            text: "SECTION 9.0 — INTELLECTUAL PROPERTY & PROPRIETARY RIGHTS",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p2-2",
            text: "9.1 Customer Data. As between Customer and Vendor, Customer retains all sole and exclusive right, title, and interest in and to all data, records, customer files, and proprietary schemas provided by Customer to Vendor under this Agreement."
          },
          {
            id: "p2-3",
            text: "9.4 Pre-existing IP & Derivative Works. All custom developments, including modifications to Vendor Core Frameworks developed during this project, shall be deemed works made for hire and owned exclusively by Client. To the extent any deliverable or modification does not qualify as a work made for hire under applicable law, Vendor hereby irrevocably assigns, transfers, and conveys to Customer all right, title, and interest worldwide.",
            clauseId: "cl-3",
            riskLevel: "CRITICAL"
          },
          {
            id: "p2-4",
            text: "SECTION 12.0 — INDEMNIFICATION & ALLOCATION OF RISK",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p2-5",
            text: "12.1 Mutual Indemnity. Each party agrees to defend, indemnify, and hold harmless the other party from and against third-party claims, liabilities, damages, and reasonable attorney fees arising out of gross negligence or intentional misconduct in the execution of this Agreement."
          },
          {
            id: "p2-6",
            text: "12.2 Indemnification Cap Exclusions. Neither party's liability under Section 11 (Confidentiality) or Section 12 (Indemnification) shall be subject to any monetary cap or aggregate liability limitations. Both parties acknowledge that statutory remedies and common law damages for disclosure of customer records or third-party intellectual property infringement shall remain uncapped and enforceable without contractual ceiling.",
            clauseId: "cl-1",
            riskLevel: "HIGH"
          }
        ]
      },
      {
        pageNumber: 3,
        headerTitle: "MASTER SERVICES AGREEMENT — TERMINATION & GOVERNING JURISDICTION",
        paragraphs: [
          {
            id: "p3-1",
            text: "SECTION 14.0 — TERM & TERMINATION RIGHTS",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p3-2",
            text: "14.1 Unilateral Termination for Convenience. Client may terminate this Agreement and any active Statement of Work immediately upon 14 days written notice without penalty or early termination fees. Vendor shall immediately cease all billable work and provide work-in-progress artifacts in their current condition without additional compensation for unfulfilled contract horizons.",
            clauseId: "cl-2",
            riskLevel: "MEDIUM"
          },
          {
            id: "p3-3",
            text: "14.2 Termination for Cause. Either party may terminate this Agreement immediately upon written notice if the other party breaches any material term and fails to cure such breach within thirty (30) days of receiving formal cure notice."
          },
          {
            id: "p3-4",
            text: "SECTION 16.0 — GOVERNING LAW & VENUE",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p3-5",
            text: "16.4 Governing Law & Venue Jurisdiction. This Agreement shall be governed by Delaware law with exclusive dispute jurisdiction in the Delaware Court of Chancery. Each party waives trial by jury and agrees to the personal jurisdiction of said courts for all equitable and contractual disputes arising hereunder.",
            clauseId: "cl-5",
            riskLevel: "LOW"
          },
          {
            id: "p3-6",
            text: "IN WITNESS WHEREOF, the Parties hereto have caused this Master Services Agreement to be executed by their duly authorized representatives as of the Effective Date."
          }
        ]
      }
    ]
  },
  {
    id: "doc-2",
    title: "Cloud Infrastructure SaaS Vendor Agreement",
    filename: "CloudStream_Vendor_Subscription_2026.pdf",
    fileSize: "1.1 MB",
    pageCount: 2,
    documentType: "SaaS Vendor Agreement",
    uploadedAt: "2026-10-07T08:15:00Z",
    status: "ready",
    riskScore: 32,
    riskLevel: "LOW",
    analysis: {
      id: "ana-2",
      documentId: "doc-2",
      documentType: "SaaS Vendor Agreement",
      summary: "Standard cloud subscription terms for managed database streaming services. Balances vendor protections with standard customer SLA remedies and capped liability, though automatic renewal terms require calendar tracking.",
      keyConcerns: [
        "60-day non-renewal requirement under Section 8.2 triggers automatic 12-month term extension.",
        "SLA credits limited to 10% under Section 4.3 as sole and exclusive remedy for downtime."
      ],
      businessImpactSummary: "Low general commercial exposure. Moderate procurement rollover risk if non-renewal milestone is missed.",
      parties: ["Nexus Cloud Systems", "CloudStream Technologies LLC"],
      effectiveDate: "January 1, 2026",
      governingLaw: "State of California, USA",
      riskScore: 32,
      aiConfidence: 96,
      findingsBreakdown: {
        total: 3,
        critical: 0,
        high: 0,
        medium: 1,
        low: 2
      },
      clauses: [
        {
          id: "cl-201",
          sectionNumber: "4.3",
          title: "Section 4.3 - Service Level Agreement Credits",
          category: "Compliance",
          pageNumber: 1,
          snippet: "If Monthly Uptime Percentage drops below 99.95%, Customer is eligible for 10% service credit upon written claim within thirty days.",
          riskLevel: "LOW",
          riskScore: 22,
          confidence: 94,
          explanation: "Standard industry SLA credit remedy providing fair recourse for unplanned system unavailability.",
          businessImpact: "Protects recurring budget by offsetting subscription fees during downtime outages.",
          recommendedAction: "Confirm internal monitoring triggers generate alerts when SLA threshold drops below 99.95%.",
          suggestedRedline: "Retain 10% SLA credit schedule; add escalation tier to 25% credit for downtime exceeding 4 consecutive hours."
        },
        {
          id: "cl-202",
          sectionNumber: "8.2",
          title: "Section 8.2 - Automatic Renewal Window",
          category: "Termination",
          pageNumber: 2,
          snippet: "Contract automatically renews for 12 months unless non-renewal notice is served 60 days prior to subscription anniversary.",
          riskLevel: "MEDIUM",
          riskScore: 52,
          confidence: 96,
          explanation: "Contract automatically locks in for another full calendar year unless non-renewal notice is dispatched at least 60 days in advance.",
          businessImpact: "Risk of unwanted budget commitment if procurement evaluation lapses.",
          recommendedAction: "Add calendar alert 75 days prior to anniversary to evaluate renewal.",
          suggestedRedline: "Contract shall convert to month-to-month subscription upon initial term completion unless affirmative renewal agreement is executed."
        },
        {
          id: "cl-203",
          sectionNumber: "10.1",
          title: "Section 10.1 - Aggregate Liability Cap",
          category: "Liability",
          pageNumber: 2,
          snippet: "Total aggregate liability of either party under this agreement shall be capped at total fees paid in previous 12 months.",
          riskLevel: "LOW",
          riskScore: 25,
          confidence: 97,
          explanation: "Well-balanced mutual limitation of liability protecting both vendor and enterprise customer.",
          businessImpact: "Limits financial exposure to predictable contract value boundaries.",
          recommendedAction: "Maintain as approved standard language.",
          suggestedRedline: "Maintain 12-month trailing fee aggregate liability cap."
        }
      ],
      risks: [
        {
          id: "rk-201",
          title: "Automatic Renewal 60-day Notice Requirement",
          severity: "MEDIUM",
          riskScore: 52,
          confidence: 96,
          pageNumber: 2,
          description: "Contract automatically renews for 12 months unless non-renewal notice is served 60 days prior.",
          clauseRef: "Section 8.2",
          affectedClauseId: "cl-202",
          businessImpact: "Unwanted budget commitment and auto-extension without procurement sign-off.",
          mitigation: "Configure internal calendar alerts 75 days ahead of renewal deadline."
        }
      ],
      recommendations: [
        {
          id: "rec-201",
          title: "Automate Renewal Notice Reminders",
          priority: "Medium",
          suggestedAction: "Set automated procurement reminder for October 15.",
          rationale: "Prevents unwanted automatic annual renewal rollover."
        }
      ],
      analyzedAt: "2026-10-07T08:17:40Z"
    },
    sections: [
      {
        id: "sec-201",
        title: "Service Scope & SLA",
        sectionNumber: "4.0",
        pageNumber: 1,
        clauses: [
          {
            id: "cl-201",
            sectionNumber: "4.3",
            title: "Section 4.3 - Service Level Agreement Credits",
            category: "Compliance",
            pageNumber: 1,
            snippet: "If Monthly Uptime Percentage drops below 99.95%, Customer is eligible for 10% service credit upon written claim within thirty days.",
            riskLevel: "LOW",
            riskScore: 22,
            confidence: 94,
            explanation: "Standard industry SLA credit remedy.",
            businessImpact: "Protects recurring budget by offsetting subscription fees during downtime outages.",
            recommendedAction: "Confirm internal monitoring triggers generate alerts when SLA threshold drops below 99.95%."
          }
        ]
      },
      {
        id: "sec-202",
        title: "Term & Renewal",
        sectionNumber: "8.0",
        pageNumber: 2,
        clauses: [
          {
            id: "cl-202",
            sectionNumber: "8.2",
            title: "Section 8.2 - Automatic Renewal Window",
            category: "Termination",
            pageNumber: 2,
            snippet: "Contract automatically renews for 12 months unless non-renewal notice is served 60 days prior to subscription anniversary.",
            riskLevel: "MEDIUM",
            riskScore: 52,
            confidence: 96,
            explanation: "Contract automatically locks in for another full calendar year unless non-renewal notice is dispatched at least 60 days in advance.",
            businessImpact: "Risk of unwanted budget commitment if procurement evaluation lapses.",
            recommendedAction: "Add calendar alert 75 days prior to anniversary to evaluate renewal."
          }
        ]
      },
      {
        id: "sec-203",
        title: "Limitation of Liability",
        sectionNumber: "10.0",
        pageNumber: 2,
        clauses: [
          {
            id: "cl-203",
            sectionNumber: "10.1",
            title: "Section 10.1 - Aggregate Liability Cap",
            category: "Liability",
            pageNumber: 2,
            snippet: "Total aggregate liability of either party under this agreement shall be capped at total fees paid in previous 12 months.",
            riskLevel: "LOW",
            riskScore: 25,
            confidence: 97,
            explanation: "Well-balanced mutual limitation of liability protecting both vendor and enterprise customer.",
            businessImpact: "Limits financial exposure to predictable contract value boundaries.",
            recommendedAction: "Maintain as approved standard language."
          }
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        headerTitle: "CLOUDSTREAM TECHNOLOGIES — SAAS SUBSCRIPTION TERMS",
        paragraphs: [
          {
            id: "p20-1",
            text: "CLOUD SUBSCRIPTION & MANAGED INFRASTRUCTURE AGREEMENT",
            isHeading: true,
            headingLevel: 1
          },
          {
            id: "p20-2",
            text: "This Cloud Subscription Agreement (\"Agreement\") is entered into between CloudStream Technologies LLC (\"Provider\") and Nexus Cloud Systems (\"Customer\") as of January 1, 2026. Provider agrees to deliver managed event-driven database clustering and automated stream partitioning services."
          },
          {
            id: "p20-3",
            text: "SECTION 4.0 — SERVICE LEVEL COMMITMENTS & CREDITS",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p20-4",
            text: "4.3 Service Level Agreement Credits. If Monthly Uptime Percentage drops below 99.95%, Customer is eligible for 10% service credit upon written claim within thirty days. Said credit represents Customer's sole and exclusive monetary remedy for standard infrastructure downtime.",
            clauseId: "cl-201",
            riskLevel: "LOW"
          }
        ]
      },
      {
        pageNumber: 2,
        headerTitle: "CLOUDSTREAM TECHNOLOGIES — RENEWAL & LIABILITY CAPS",
        paragraphs: [
          {
            id: "p20-5",
            text: "SECTION 8.0 — SUBSCRIPTION TERM & AUTOMATIC ROLLOVER",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p20-6",
            text: "8.2 Automatic Renewal Window. Contract automatically renews for 12 months unless non-renewal notice is served 60 days prior to subscription anniversary. Pricing shall be subject to a maximum 5% cost-of-living index adjustment on each renewal date.",
            clauseId: "cl-202",
            riskLevel: "MEDIUM"
          },
          {
            id: "p20-7",
            text: "SECTION 10.0 — MUTUAL LIMITATION OF LIABILITY",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p20-8",
            text: "10.1 Aggregate Liability Cap. Total aggregate liability of either party under this agreement shall be capped at total fees paid in previous 12 months. In no event shall either party be liable for lost profits, indirect, or consequential damages.",
            clauseId: "cl-203",
            riskLevel: "LOW"
          }
        ]
      }
    ]
  },
  {
    id: "doc-3",
    title: "Executive Senior Architect Employment Agreement",
    filename: "Employment_Agreement_VP_Eng.pdf",
    fileSize: "780 KB",
    pageCount: 2,
    documentType: "Employment Agreement",
    uploadedAt: "2026-10-07T09:40:00Z",
    status: "ready",
    riskScore: 54,
    riskLevel: "MEDIUM",
    analysis: {
      id: "ana-3",
      documentId: "doc-3",
      documentType: "Employment Agreement",
      summary: "Executive employment agreement featuring intellectual property assignment, confidentiality provisions, 12-month post-employment non-compete, and severance terms.",
      keyConcerns: [
        "Worldwide geographic non-compete restriction under Section 7.2 faces strict legal unenforceability challenges.",
        "Overly broad post-employment non-solicitation triggers."
      ],
      businessImpactSummary: "Legal risk of restrictive covenant nullification and potential executive retention friction.",
      parties: ["DocuSense AI Corp.", "Dr. Elena Rostova"],
      effectiveDate: "October 15, 2026",
      governingLaw: "State of New York, USA",
      riskScore: 54,
      aiConfidence: 91,
      findingsBreakdown: {
        total: 2,
        critical: 0,
        high: 1,
        medium: 0,
        low: 1
      },
      clauses: [
        {
          id: "cl-301",
          sectionNumber: "7.2",
          title: "Section 7.2 - Geographic Non-Compete Scope",
          category: "Compliance",
          pageNumber: 1,
          snippet: "Employee shall not directly or indirectly engage in competitive AI document analysis services worldwide for a period of 12 months following departure.",
          riskLevel: "HIGH",
          riskScore: 82,
          confidence: 93,
          explanation: "Enforceability of worldwide non-compete covenant is questionable under modern employment statutory guidelines.",
          businessImpact: "Exposes agreement to litigation challenges or total invalidation under current statutory non-compete scrutiny.",
          recommendedAction: "Narrow covenant to direct named competitor organizations and active key accounts.",
          suggestedRedline: "Employee agrees not to perform competitive AI services for specific named entities in Schedule A within the New York metropolitan territory for nine (9) months post-departure."
        },
        {
          id: "cl-302",
          sectionNumber: "9.1",
          title: "Section 9.1 - Inventions and Discoveries Assignment",
          category: "Intellectual Property",
          pageNumber: 2,
          snippet: "All inventions, patentable designs, algorithms and discoveries conceived during the employment term belong entirely to the Company.",
          riskLevel: "LOW",
          riskScore: 20,
          confidence: 98,
          explanation: "Standard proprietary invention assignment agreement securing executive IP rights.",
          businessImpact: "Protects corporate patents and core model training datasets.",
          recommendedAction: "Retain standard proprietary assignment schedule.",
          suggestedRedline: "Retain standard proprietary invention assignment schedule."
        }
      ],
      risks: [
        {
          id: "rk-301",
          title: "Overly Broad Restrictive Covenant",
          severity: "HIGH",
          riskScore: 82,
          confidence: 93,
          pageNumber: 1,
          description: "Global non-compete covenant may be ruled void and unenforceable or trigger legal challenges.",
          clauseRef: "Section 7.2",
          affectedClauseId: "cl-301",
          businessImpact: "Court invalidation of non-compete and potential exposure of proprietary operational tradecraft.",
          mitigation: "Tailor geographic scope to direct active client relationships."
        }
      ],
      recommendations: [
        {
          id: "rec-301",
          title: "Limit Non-Compete to Specific Defined Competitors",
          priority: "Medium",
          suggestedAction: "Refine Section 7.2 to target named direct competitors rather than worldwide AI services.",
          rationale: "Improves legal enforceability and mutual executive satisfaction."
        }
      ],
      analyzedAt: "2026-10-07T09:42:15Z"
    },
    sections: [
      {
        id: "sec-301",
        title: "Restrictive Covenants",
        sectionNumber: "7.0",
        pageNumber: 1,
        clauses: [
          {
            id: "cl-301",
            sectionNumber: "7.2",
            title: "Section 7.2 - Geographic Non-Compete Scope",
            category: "Compliance",
            pageNumber: 1,
            snippet: "Employee shall not directly or indirectly engage in competitive AI document analysis services worldwide for a period of 12 months following departure.",
            riskLevel: "HIGH",
            riskScore: 82,
            confidence: 93,
            explanation: "Enforceability of worldwide non-compete covenant is questionable under modern employment statutory guidelines.",
            businessImpact: "Exposes agreement to litigation challenges or total invalidation under current FTC non-compete scrutiny.",
            recommendedAction: "Narrow covenant to direct named competitor organizations and active key accounts."
          }
        ]
      },
      {
        id: "sec-302",
        title: "Intellectual Property Assignment",
        sectionNumber: "9.0",
        pageNumber: 2,
        clauses: [
          {
            id: "cl-302",
            sectionNumber: "9.1",
            title: "Section 9.1 - Inventions and Discoveries Assignment",
            category: "Intellectual Property",
            pageNumber: 2,
            snippet: "All inventions, patentable designs, algorithms and discoveries conceived during the employment term belong entirely to the Company.",
            riskLevel: "LOW",
            riskScore: 20,
            confidence: 98,
            explanation: "Standard proprietary invention assignment agreement securing executive IP rights.",
            businessImpact: "Protects corporate patents and core model training datasets.",
            recommendedAction: "Retain standard proprietary assignment schedule."
          }
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        headerTitle: "DOCUSENSE AI CORP — EXECUTIVE EMPLOYMENT TERMS",
        paragraphs: [
          {
            id: "p30-1",
            text: "EXECUTIVE EMPLOYMENT AGREEMENT",
            isHeading: true,
            headingLevel: 1
          },
          {
            id: "p30-2",
            text: "This Executive Employment Agreement is entered into between DocuSense AI Corp. (\"Company\") and Dr. Elena Rostova (\"Executive\") as Principal AI Architect, effective October 15, 2026."
          },
          {
            id: "p30-3",
            text: "SECTION 7.0 — RESTRICTIVE COVENANTS & COMPETITION",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p30-4",
            text: "7.2 Geographic Non-Compete Scope. Employee shall not directly or indirectly engage in competitive AI document analysis services worldwide for a period of 12 months following departure.",
            clauseId: "cl-301",
            riskLevel: "HIGH"
          }
        ]
      },
      {
        pageNumber: 2,
        headerTitle: "DOCUSENSE AI CORP — INVENTIONS & DISCOVERIES ASSIGNMENT",
        paragraphs: [
          {
            id: "p30-5",
            text: "SECTION 9.0 — INVENTIONS & INTELLECTUAL PROPERTY",
            isHeading: true,
            headingLevel: 2
          },
          {
            id: "p30-6",
            text: "9.1 Inventions and Discoveries Assignment. All inventions, patentable designs, algorithms and discoveries conceived during the employment term belong entirely to the Company.",
            clauseId: "cl-302",
            riskLevel: "LOW"
          }
        ]
      }
    ]
  }
];

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    type: "analysis_completed",
    documentId: "doc-1",
    documentTitle: "Global Enterprise Master Services Agreement",
    timestamp: "12 mins ago",
    description: "Completed full deep analysis with 3 high-priority risk clauses identified."
  },
  {
    id: "act-2",
    type: "risk_flagged",
    documentId: "doc-1",
    documentTitle: "Global Enterprise Master Services Agreement",
    timestamp: "18 mins ago",
    description: "Flagged uncapped liability in Section 12.2 and IP work-for-hire assignment in Section 9.4."
  },
  {
    id: "act-3",
    type: "upload",
    documentId: "doc-3",
    documentTitle: "Executive Senior Architect Employment Agreement",
    timestamp: "1 hour ago",
    description: "Uploaded by Legal Operations and queued for automated compliance extraction."
  },
  {
    id: "act-4",
    type: "analysis_completed",
    documentId: "doc-2",
    documentTitle: "Cloud Infrastructure SaaS Vendor Agreement",
    timestamp: "2 hours ago",
    description: "Analysis finished with Low Risk score (32/100). Ready for contract sign-off."
  }
];

export const MOCK_STATS: DashboardStats = {
  totalDocuments: 14,
  analyzedDocuments: 12,
  highRiskDocuments: 3,
  averageRiskScore: 46
};
