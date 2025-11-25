interface WorkflowFile {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  price: number;
  downloadUrl: string;
}

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/pr2companydev-dot/estrategia_b2b/main/workflows";

// Mapeamento de arquivos do repositório
const WORKFLOW_FILES = [
  // Schedule
  { file: "Schedule/0631_Schedule_Wordpress_Automate_Scheduled.json", category: "Automation" },
  { file: "Schedule/1607_Schedule_Notion_Sync_Scheduled.json", category: "Productivity" },
  { file: "Schedule/1602_Schedule_Youtube_Create_Scheduled.json", category: "Social Media" },
  
  // Automation
  { file: "Automation/1290_Automation.json", category: "Automation" },
  
  // AWS SNS
  { file: "Awssns/0984_Awssns_Automate_Triggered.json", category: "AWS" },
  
  // GitLab
  { file: "Gitlab/0998_Gitlab_Automate_Triggered.json", category: "DevOps" },
  
  // Automate
  { file: "Automate/1123_Automate.json", category: "Automation" },
  
  // Asana
  { file: "Asana/1223_Asana_Webhook_Automate_Webhook.json", category: "Project Management" },
  
  // Autopilot
  { file: "Autopilot/1228_Autopilot_Airtable_Automate_Triggered.json", category: "Marketing" },
  { file: "Autopilot/1227_Autopilot_Automate.json", category: "Marketing" },
  
  // AWS Textract
  { file: "Awstextract/0148_Awstextract_Telegram_Automate_Triggered.json", category: "AWS" },
  
  // AWS S3
  { file: "Awss3/0151_Awss3_GoogleDrive_Import_Triggered.json", category: "AWS" },
  
  // Gmail
  { file: "Gmail/0221_Gmail_Movebinarydata_Send.json", category: "Email" },
];

export async function scanWorkflowsFromGitHub(): Promise<WorkflowFile[]> {
  const workflows: WorkflowFile[] = [];

  for (const item of WORKFLOW_FILES) {
    try {
      const downloadUrl = `${GITHUB_RAW_BASE}/${item.file}`;
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        console.warn(`Failed to fetch ${item.file}`);
        continue;
      }

      const data = await response.json();
      
      // Extrair informações do workflow
      const workflow: WorkflowFile = {
        id: item.file.replace(/\//g, '-').replace('.json', ''),
        name: data.name || item.file.split('/').pop()?.replace('.json', '') || 'Unnamed Workflow',
        category: item.category,
        description: data.description || data.notes || 'Workflow automatizado n8n',
        tags: data.tags || ['n8n', 'automation'],
        price: 49.90, // Preço padrão
        downloadUrl,
      };

      workflows.push(workflow);
    } catch (error) {
      console.error(`Error processing ${item.file}:`, error);
    }
  }

  return workflows;
}

export function getCategoryFromPath(filePath: string): string {
  const categoryMap: Record<string, string> = {
    'gmail': 'Email',
    'asana': 'Project Management',
    'autopilot': 'Marketing',
    'aws': 'AWS',
    'gitlab': 'DevOps',
    'automation': 'Automation',
  };

  const pathLower = filePath.toLowerCase();
  
  for (const [key, value] of Object.entries(categoryMap)) {
    if (pathLower.includes(key)) {
      return value;
    }
  }

  return 'Outros';
}
