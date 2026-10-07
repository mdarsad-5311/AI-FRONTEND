export type DocumentType = 
  | "Master Services Agreement"
  | "SaaS Vendor Agreement"
  | "Employment Agreement"
  | "Non-Disclosure Agreement"
  | "Service Level Agreement"
  | "Technical Specification";

export type ProcessingStatus = "ready" | "processing" | "analyzing" | "uploaded" | "analyzed" | "failed";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Clause {
  id: string;
  title: string;
  sectionNumber?: string;
  category: "Liability" | "Termination" | "Intellectual Property" | "Confidentiality" | "Payment" | "Compliance";
  pageNumber: number;
  snippet: string;
  riskLevel: RiskLevel;
  riskScore?: number;
  confidence?: number;
  explanation: string;
  businessImpact?: string;
  recommendedAction?: string;
  suggestedRedline?: string;
}

export interface DocumentRisk {
  id: string;
  title: string;
  severity: RiskLevel;
  riskScore?: number;
  confidence?: number;
  pageNumber?: number;
  description: string;
  clauseRef?: string;
  affectedClauseId?: string;
  mitigation: string;
  businessImpact?: string;
}

export interface Recommendation {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  suggestedAction: string;
  rationale: string;
}

export interface DocumentSection {
  id: string;
  title: string;
  sectionNumber: string;
  pageNumber: number;
  clauses: Clause[];
}

export interface ContractParagraph {
  id: string;
  text: string;
  clauseId?: string;
  riskLevel?: RiskLevel;
  isHeading?: boolean;
  headingLevel?: number;
}

export interface ContractPage {
  pageNumber: number;
  headerTitle: string;
  paragraphs: ContractParagraph[];
}

export interface RiskFindingsBreakdown {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface ContractObligation {
  party: string;
  description: string;
  page_start?: number;
  page_end?: number;
}

export interface ImportantTerm {
  term: string;
  value: string;
  page_start?: number;
}

export interface MissingOrConcerning {
  title: string;
  description: string;
}

export interface DocumentAnalysis {
  id: string;
  documentId: string;
  documentType: DocumentType;
  contractType?: string;
  summary: string;
  keyConcerns?: string[];
  businessImpactSummary?: string;
  parties: string[];
  effectiveDate: string;
  governingLaw: string;
  riskScore: number; // 0 - 100 (100 = highest risk)
  overallRisk?: string;
  aiConfidence?: number; // e.g. 94%
  findingsBreakdown?: RiskFindingsBreakdown;
  clauses: Clause[];
  risks: DocumentRisk[];
  recommendations: Recommendation[];
  obligations?: ContractObligation[];
  importantTerms?: ImportantTerm[];
  missingOrConcerning?: MissingOrConcerning[];
  modelName?: string;
  analyzedAt: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  filename: string;
  fileSize: string;
  pageCount: number;
  documentType: DocumentType;
  uploadedAt: string;
  status: ProcessingStatus;
  riskScore: number;
  riskLevel: RiskLevel;
  pdfUrl?: string;
  analysis?: DocumentAnalysis;
  sections?: DocumentSection[];
  pages?: ContractPage[];
}

export interface DashboardStats {
  totalDocuments: number;
  analyzedDocuments: number;
  highRiskDocuments: number;
  averageRiskScore: number;
}

export interface ActivityItem {
  id: string;
  type: "upload" | "analysis_completed" | "risk_flagged" | "export";
  documentId: string;
  documentTitle: string;
  timestamp: string;
  description: string;
}
