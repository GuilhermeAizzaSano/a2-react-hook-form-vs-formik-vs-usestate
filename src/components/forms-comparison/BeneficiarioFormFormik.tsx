import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Alert, Box, Button, Chip, Paper, TextField, Typography } from '@mui/material';
import { cadastrarBeneficiario } from '../../services/api';

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
    <Paper elevation={2} sx={{ p: 2.5, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Formik (useFormik)
        </Typography>
        <Chip label={`Renders: ${renderCount.current}`} color="info" size="small" />
      </Box>

      {feedback && (
        <Alert severity={feedback.type} sx={{ mb: 1.5 }}>
          {feedback.message}
        </Alert>
      )}

      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          label="Nome"
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
          label="CPF"
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
          label="Telefone"
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
          sx={{ mt: 1.5 }}
        >
          {formik.isSubmitting ? 'Enviando...' : 'Cadastrar (Formik)'}
        </Button>
      </Box>
    </Paper>
  );
}
