'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailTemplateSchema, type EmailTemplateInput } from '@/lib/validations/email'
import { extractVariables } from '@/lib/email/templates'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import type { EmailTemplate } from '@/lib/actions/email'

interface EmailTemplateFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template?: EmailTemplate | null
  onSubmit: (data: EmailTemplateInput) => Promise<void>
}

const categoryOptions = [
  { value: 'general', label: 'General' },
  { value: 'lead', label: 'Lead' },
  { value: 'booking', label: 'Booking' },
  { value: 'followup', label: 'Follow-up' },
  { value: 'proposal', label: 'Proposal' },
]

export function EmailTemplateForm({
  open,
  onOpenChange,
  template,
  onSubmit,
}: EmailTemplateFormProps) {
  const [detectedVariables, setDetectedVariables] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmailTemplateInput>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: template
      ? {
        name: template.name,
        subject: template.subject,
        body: template.body,
        variables: template.variables || [],
        category: template.category || 'general',
        is_active: template.is_active ?? true,
      }
      : {
        category: 'general',
        is_active: true,
        variables: [],
      },
  })

  const subject = watch('subject')
  const body = watch('body')

  // Detect variables from subject and body
  useEffect(() => {
    const allText = `${subject || ''} ${body || ''}`
    const vars = extractVariables(allText)
    setDetectedVariables(vars)
    setValue('variables', vars)
  }, [subject, body, setValue])

  const handleFormSubmit = async (data: EmailTemplateInput) => {
    await onSubmit(data)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {template ? 'Edit Email Template' : 'Create Email Template'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Welcome Email"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={watch('category') || 'general'}
                onValueChange={(value) => setValue('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="Thanks for reaching out, {{name}}!"
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
            <p className="text-xs text-gray-400">
              Use {'{{variable}}'} syntax for dynamic content
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Body *</Label>
            <Textarea
              id="body"
              {...register('body')}
              placeholder="Hi {{name}},&#10;&#10;Thank you for your interest in our {{service}} services..."
              rows={12}
              className="font-mono text-sm"
            />
            {errors.body && (
              <p className="text-sm text-red-500">{errors.body.message}</p>
            )}
            <p className="text-xs text-gray-400">
              Supports HTML formatting. Use {'{{variable}}'} for dynamic content.
            </p>
          </div>

          {/* Detected Variables */}
          {detectedVariables.length > 0 && (
            <div className="space-y-2">
              <Label>Detected Variables</Label>
              <div className="flex flex-wrap gap-2">
                {detectedVariables.map((variable) => (
                  <Badge key={variable} variant="secondary">
                    {`{{${variable}}}`}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Active Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              {...register('is_active')}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="is_active" className="font-normal">
              Template is active and available for use
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving...'
                : template
                  ? 'Update Template'
                  : 'Create Template'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
