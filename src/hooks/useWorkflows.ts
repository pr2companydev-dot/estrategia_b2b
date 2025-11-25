import { useState, useEffect } from 'react';
import { scanWorkflowsFromGitHub } from '@/utils/workflowScanner';
import { Workflow } from '@/contexts/CartContext';

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWorkflows() {
      try {
        setLoading(true);
        const scannedWorkflows = await scanWorkflowsFromGitHub();
        setWorkflows(scannedWorkflows);
        setError(null);
      } catch (err) {
        console.error('Error loading workflows:', err);
        setError('Erro ao carregar workflows do GitHub');
      } finally {
        setLoading(false);
      }
    }

    loadWorkflows();
  }, []);

  return { workflows, loading, error };
}
