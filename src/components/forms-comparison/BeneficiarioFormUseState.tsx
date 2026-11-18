import { useRef, useState } from 'react';
import { Alert, Box, Button, Chip, Paper, TextField, Typography } from '@mui/material';
import { cadastrarBeneficiario } from '../../services/api';

interface Props {
  offlineMode: boolean;
  onSuccess: (origem: string) => void;
}

export function BeneficiarioFormUseState({ offlineMode, onSuccess }: Props) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [errors, setErrors] = useState<{ nome?: string; cpf?: string; telefone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const validate = () => {
    const nextErrors: { nome?: string; cpf?: string; telefone?: string } = {};
    if (nome.trim().length < 3) nextErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    if (!/^\d{11}$/.test(cpf.trim())) nextErrors.cpf = 'CPF deve ter 11 dígitos numéricos';
    if (telefone.trim() && !/^\d{10,11}$/.test(telefone.trim())) {
      nextErrors.telefone = 'Telefone deve ter 10 ou 11 dígitos';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await cadastrarBeneficiario(
        {
          nome: nome.trim(),
          cpf: cpf.trim(),
          telefone: telefone.trim() || undefined,
        },
        offlineMode,
      );
      setNome('');
      setCpf('');
      setTelefone('');
      setErrors({});
      setFeedback({ type: 'success', message: 'Cadastrado via useState!' });
      onSuccess('useState');
    } catch {
      setFeedback({ type: 'error', message: 'Erro ao cadastrar (verifique a API ou ative o Modo Simulação).' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2.5, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          useState (Controlado)
        </Typography>
        <Chip label={`Renders: ${renderCount.current}`} color="warning" size="small" />
      </Box>

      {feedback && (
        <Alert severity={feedback.type} sx={{ mb: 1.5 }}>
          {feedback.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          error={!!errors.nome}
          helperText={errors.nome}
          fullWidth
          size="small"
          margin="dense"
          required
        />
        <TextField
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          error={!!errors.cpf}
          helperText={errors.cpf}
          fullWidth
          size="small"
          margin="dense"
          required
          slotProps={{ htmlInput: { maxLength: 11 } }}
        />
        <TextField
          label="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          error={!!errors.telefone}
          helperText={errors.telefone}
          fullWidth
          size="small"
          margin="dense"
        />
        <Button type="submit" variant="outlined" fullWidth disabled={submitting} sx={{ mt: 1.5 }}>
          {submitting ? 'Enviando...' : 'Cadastrar (useState)'}
        </Button>
      </Box>
    </Paper>
  );
}
