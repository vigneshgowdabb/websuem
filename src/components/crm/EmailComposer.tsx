'use client'

import { useState, useEffect } from 'react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Send, FileText } from 'lucide-react'
import type { EmailTemplate } from '@/lib/actions/email'

interface EmailComposerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipient?: {
    email: string
    name?: string
  }
  leadId?: string
  clientId?: string
  templates?: EmailTemplate[]
  onSend: (data: {
    to: string
    toName?: string
    subject: string
    body: string
    template_id?: string
    variables?: Record<string, string>
  }) => Promise<void>
}

export function EmailComposer({
  open,
  onOpenChange,
  recipient,
  leadId: _leadId,
  clientId: _clientId,
  templates = [],
  onSend,
}: EmailComposerProps) {
  // leadId and clientId reserved for future use (linking emails to records)
  void _leadId
  void _clientId
  const [activeTab, setActiveTab] = useState<'compose' | 'template'>('compose')
  const [to, setTo] = useState(recipient?.email || '')
  const [toName, setToName] = useState(recipient?.name || '')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (recipient) {
      setTo(recipient.email)
      setToName(recipient.name || '')
    }
  }, [recipient])

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find((t) => t.id === selectedTemplate)
      if (template) {
        // Initialize variables with empty strings
        const vars: Record<string, string> = {}
        template.variables.forEach((v) => {
          vars[v] = templateVariables[v] || ''
        })
        // Pre-fill name if available
        if (vars.name !== undefined && toName) {
          vars.name = toName
        }
        setTemplateVariables(vars)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate, templates, toName])

  const handleSend = async () => {
    if (!to || isSubmitting) return

    setIsSubmitting(true)
    try {
      if (activeTab === 'template' && selectedTemplate) {
        await onSend({
          to,
          toName,
          subject: '', // Will be filled by template
          body: '', // Will be filled by template
          template_id: selectedTemplate,
          variables: templateVariables,
        })
      } else {
        await onSend({
          to,
          toName,
          subject,
          body,
        })
      }
      onOpenChange(false)
      // Reset form
      setSubject('')
      setBody('')
      setSelectedTemplate('')
      setTemplateVariables({})
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compose Email</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Recipient */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="to">To (Email) *</Label>
              <Input
                id="to"
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toName">Name</Label>
              <Input
                id="toName"
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                placeholder="Recipient Name"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'compose' | 'template')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="compose">Compose</TabsTrigger>
              <TabsTrigger value="template" disabled={templates.length === 0}>
                Use Template
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compose" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Message *</Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your message here..."
                  rows={10}
                />
              </div>
            </TabsContent>

            <TabsContent value="template" className="space-y-4">
              <div className="space-y-2">
                <Label>Select Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          {template.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTemplateData && (
                <>
                  {/* Template Variables */}
                  {selectedTemplateData.variables.length > 0 && (
                    <div className="space-y-3">
                      <Label>Fill in Variables</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedTemplateData.variables.map((variable) => (
                          <div key={variable} className="space-y-1">
                            <Label className="text-xs text-gray-500 capitalize">
                              {variable.replace(/_/g, ' ')}
                            </Label>
                            <Input
                              value={templateVariables[variable] || ''}
                              onChange={(e) =>
                                setTemplateVariables((prev) => ({
                                  ...prev,
                                  [variable]: e.target.value,
                                }))
                              }
                              placeholder={`Enter ${variable}...`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview */}
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="bg-gray-50 rounded-lg p-4 text-sm">
                      <p className="font-medium mb-2">
                        Subject:{' '}
                        {selectedTemplateData.subject.replace(
                          /\{\{(\w+)\}\}/g,
                          (_, key) => templateVariables[key] || `{{${key}}}`
                        )}
                      </p>
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: selectedTemplateData.body.replace(
                            /\{\{(\w+)\}\}/g,
                            (_, key) =>
                              `<span class="font-medium text-vibrant-yellow">${
                                templateVariables[key] || `{{${key}}}`
                              }</span>`
                          ),
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={
                !to ||
                isSubmitting ||
                (activeTab === 'compose' && (!subject || !body)) ||
                (activeTab === 'template' && !selectedTemplate)
              }
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Email'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
