import { memo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';
import { beneficiarioSchema, type BeneficiarioFormData } from '../../schemas/beneficiarioSchema';
import { cadastrarBeneficiario } from '../../services/api';
import { RenderBadge } from './RenderBadge';

interface Props {
  offlineMode: boolean;
  onSuccess: (origem: string) => void;
}

export const BeneficiarioFormRHF = memo(function BeneficiarioFormRHF({ offlineMode, onSuccess }: Props) {
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
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        height: '100%',
        borderTop: '3px solid #10b981',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
        <Box>
          <Typography
            sx={{
              fontFamily: 'Consolas, monospace',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#065f46',
              textTransform: 'uppercase',
            }}
          >
            Uncontrolled · Ref
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
            React Hook Form
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            Lê valores direto do DOM via <code>register</code>. Não re-renderiza ao digitar.
          </Typography>
        </Box>
        <RenderBadge count={renderCount.current} tone="success" />
      </Box>

      {feedback && (
        <Alert severity={feedback.type} sx={{ mb: 1.5, py: 0.25 }}>
          {feedback.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 'auto' }}>
        <TextField
          label="Nome"
          placeholder="Ex: Maria da Silva"
          {...register('nome')}
          error={!!errors.nome}
          helperText={errors.nome?.message}
          fullWidth
          size="small"
          margin="dense"
          required
        />
        <TextField
          label="CPF (11 dígitos)"
          placeholder="12345678901"
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
          label="Telefone (opcional)"
          placeholder="11999999999"
          {...register('telefone')}
          error={!!errors.telefone}
          helperText={errors.telefone?.message}
          fullWidth
          size="small"
          margin="dense"
        />
        <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ mt: 2 }}>
          {isSubmitting ? 'Enviando...' : 'Cadastrar (RHF)'}
        </Button>
      </Box>
    </Paper>
  );
});
