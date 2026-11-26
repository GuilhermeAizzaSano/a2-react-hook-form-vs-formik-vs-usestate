import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';
import { cadastrarBeneficiario } from '../../services/api';
import { RenderBadge } from './RenderBadge';

interface Props {
  offlineMode: boolean;
  onSuccess: (origem: string) => void;
}

interface FormValues {
  nome: string;
  cpf: string;
  telefone: string;
}

export function BeneficiarioFormFormik({ offlineMode, onSuccess }: Props) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: { nome: '', cpf: '', telefone: '' },
    validate: (values) => {
      const errors: Partial<FormValues> = {};
      if (values.nome.trim().length < 3) errors.nome = 'Nome deve ter pelo menos 3 caracteres';
      if (!/^\d{11}$/.test(values.cpf.trim())) errors.cpf = 'CPF deve ter 11 dígitos numéricos';
      if (values.telefone.trim() && !/^\d{10,11}$/.test(values.telefone.trim())) {
        errors.telefone = 'Telefone deve ter 10 ou 11 dígitos';
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      setFeedback(null);
      try {
        await cadastrarBeneficiario(
          {
            nome: values.nome.trim(),
            cpf: values.cpf.trim(),
            telefone: values.telefone.trim() || undefined,
          },
          offlineMode,
        );
        resetForm();
        setFeedback({ type: 'success', message: 'Cadastrado via Formik!' });
        onSuccess('Formik');
      } catch {
        setFeedback({ type: 'error', message: 'Erro ao cadastrar (verifique a API ou ative o Modo Simulação).' });
      }
    },
  });

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        height: '100%',
        borderTop: '3px solid #3b82f6',
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
              color: '#1e40af',
              textTransform: 'uppercase',
            }}
          >
            Controlled · useFormik
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
            Formik
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            Estado centralizado no React. Re-renderiza a cada tecla e no <code>onBlur</code>.
          </Typography>
        </Box>
        <RenderBadge count={renderCount.current} tone="info" />
      </Box>

      {feedback && (
        <Alert severity={feedback.type} sx={{ mb: 1.5, py: 0.25 }}>
          {feedback.message}
        </Alert>
      )}

      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 'auto' }}>
        <TextField
          label="Nome"
          placeholder="Ex: Maria da Silva"
          name="nome"
          value={formik.values.nome}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nome && !!formik.errors.nome}
          helperText={formik.touched.nome ? formik.errors.nome : undefined}
          fullWidth
          size="small"
          margin="dense"
          required
        />
        <TextField
          label="CPF (11 dígitos)"
          placeholder="12345678901"
          name="cpf"
          value={formik.values.cpf}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cpf && !!formik.errors.cpf}
          helperText={formik.touched.cpf ? formik.errors.cpf : undefined}
          fullWidth
          size="small"
          margin="dense"
          required
          slotProps={{ htmlInput: { maxLength: 11 } }}
        />
        <TextField
          label="Telefone (opcional)"
          placeholder="11999999999"
          name="telefone"
          value={formik.values.telefone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.telefone && !!formik.errors.telefone}
          helperText={formik.touched.telefone ? formik.errors.telefone : undefined}
          fullWidth
          size="small"
          margin="dense"
        />
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          fullWidth
          disabled={formik.isSubmitting}
          sx={{ mt: 2 }}
        >
          {formik.isSubmitting ? 'Enviando...' : 'Cadastrar (Formik)'}
        </Button>
      </Box>
    </Paper>
  );
}
