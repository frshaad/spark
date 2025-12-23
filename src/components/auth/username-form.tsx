'use client';

import { LoaderCircle } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useUsernameForm } from '@/hooks/use-username-form';
import { AuthError } from './auth-error';

export default function UsernameForm() {
  const { control, handleSubmit, isPending, error } = useUsernameForm();

  return (
    <div className="flex flex-col gap-7">
      <AuthError message={error} />

      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-4">
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username-field">Username</FieldLabel>
                <Input
                  {...field}
                  id="username-field"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field className="mt-3">
            <Button type="submit" disabled={isPending} className="relative">
              {isPending ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" />{' '}
                  <span>Submitting...</span>
                </div>
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
