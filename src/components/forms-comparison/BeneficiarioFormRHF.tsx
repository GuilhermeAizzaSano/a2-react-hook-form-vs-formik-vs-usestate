import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Chip, Paper, TextField, Typography } from '@mui/material';
import { beneficiarioSchema, type BeneficiarioFormData } from '../../schemas/beneficiarioSchema';
import { cadastrarBeneficiario } from '../../services/api';

interface Props {
  offlineMode: boolean;
  onSuccess: (origem: string) => void;
}

export function BeneficiarioFormRHF({ offlineMode, onSuccess }: Props) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BeneficiarioFormData>({
    resolver: zodResolver(beneficiarioSchema),
  });

  const onSubmit = async (data: BeneficiarioFormData) => {
    setFeedback(null);
    try {
      await cadastrarBeneficiario(
        {
          nome: data.nome,
          cpf: data.cpf,
          telefone: data.telefone || undefined,
        },
        offlineMode,
      );
      reset();
      setFeedback({ type: 'success', message: 'Cadastrado via React Hook Form!' });
      onSuccess('React Hook Form');
    } catch {
      setFeedback({ type: 'error', message: 'Erro ao cadastrar (verifique a API ou ative o Modo Simulação).' });
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2.5, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          React Hook Form + Zod
        </Typography>
        <Chip label={`Renders: ${renderCount.current}`} color="success" size="small" />
      </Box>

      {feedback && (
        <Alert severity={feedback.type} sx={{ mb: 1.5 }}>
          {feedback.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Nome"
          {...register('nome')}
          error={!!errors.nome}
          helperText={errors.nome?.message}
          fullWidth
          size="small"
          margin="dense"
          required
        />
        <TextField
          label="CPF"
          {...register('cpf')}
          error={!!errors.cpf}
          helperText={errors.cpf?.message}
          fullWidth
          size="small"
          margin="dense"
          required
          slotProps={{ htmlInput: { maxLength: 11 } }}
        />
        <TextField
          label="Telefone"
          {...register('telefone')}
          error={!!errors.telefone}
          helperText={errors.telefone?.message}
          fullWidth
          size="small"
          margin="dense"
        />
        <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ mt: 1.5 }}>
          {isSubmitting ? 'Enviando...' : 'Cadastrar (RHF)'}
        </Button>
      </Box>
    </Paper>
  );
}
