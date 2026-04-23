import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Separator } from '#/components/ui/separator'
import {
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  LayersIcon,
  PaletteIcon,
  SparklesIcon,
  TerminalIcon,
  ZapIcon,
} from 'lucide-react'

export const Route = createFileRoute('/')({ component: WelcomePage })

const APPLY_COMMAND = 'bunx --bun shadcn@latest apply --preset <preset_id> -y'

const TECH_STACK = [
  {
    category: 'Framework',
    items: [
      {
        name: 'TanStack Start',
        description: 'Full-stack React framework',
        href: 'https://tanstack.com/start',
      },
      {
        name: 'TanStack Router',
        description: 'Type-safe file-based routing',
        href: 'https://tanstack.com/router',
      },
      {
        name: 'TanStack Query',
        description: 'Async state management',
        href: 'https://tanstack.com/query',
      },
    ],
  },
  {
    category: 'UI',
    items: [
      {
        name: 'shadcn/ui',
        description: 'Beautifully designed components',
        href: 'https://ui.shadcn.com',
      },
      {
        name: 'Tailwind CSS v4',
        description: 'Utility-first CSS',
        href: 'https://tailwindcss.com',
      },
      {
        name: 'Lucide React',
        description: 'Consistent icon set',
        href: 'https://lucide.dev',
      },
    ],
  },
  {
    category: 'Backend',
    items: [
      {
        name: 'oRPC',
        description: 'End-to-end type-safe APIs',
        href: 'https://orpc.io',
      },
      {
        name: 'Better Auth',
        description: 'Authentication & sessions',
        href: 'https://better-auth.com',
      },
      {
        name: 'Drizzle ORM',
        description: 'Type-safe SQL query builder',
        href: 'https://orm.drizzle.team',
      },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      {
        name: 'PostgreSQL',
        description: 'Relational database',
        href: 'https://www.postgresql.org',
      },
      {
        name: 'Redis',
        description: 'In-memory data store',
        href: 'https://redis.io',
      },
      {
        name: 'Bun',
        description: 'Fast JavaScript runtime & toolkit',
        href: 'https://bun.sh',
      },
    ],
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="shrink-0 size-8 text-muted-foreground hover:text-foreground"
      aria-label="Copy command"
    >
      {copied ? (
        <CheckIcon className="size-4 text-green-500" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </Button>
  )
}

function WelcomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground mb-2">
            <SparklesIcon className="size-3.5" />
            <span>TanStack Fullstack Starter</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your app starts here
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A production-ready fullstack starter template built with TanStack
            Start, shadcn/ui, oRPC, Better Auth, and Drizzle ORM — batteries
            included.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              render={
                <a
                  href="https://tanstack.com/start/latest"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              Read the docs
              <ExternalLinkIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              render={
                <a
                  href="https://github.com/kddige/tanstack-starter-template"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              View on GitHub
              <ExternalLinkIcon className="size-4" />
            </Button>
          </div>
        </section>

        <Separator />

        {/* Theming */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PaletteIcon className="size-4" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Make it yours in seconds
              </h2>
              <p className="text-sm text-muted-foreground">
                Instantly apply any colour palette &amp; style preset from the
                shadcn theme builder.
              </p>
            </div>
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ZapIcon className="size-4 text-primary" />3 steps to a
                brand-new look
              </CardTitle>
              <CardDescription>
                No config files to touch — the command rewrites your CSS
                variables automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Step 1 */}
              <div className="flex gap-4">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground mt-0.5">
                  1
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Visit the shadcn theme builder
                  </p>
                  <a
                    href="https://ui.shadcn.com/create"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
                  >
                    ui.shadcn.com/create
                    <ExternalLinkIcon className="size-3.5" />
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Browse presets or design your own colour scheme, radius, and
                    fonts.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground mt-0.5">
                  2
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Pick a preset &amp; copy its ID
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Every preset on the site has a unique ID you can use
                    directly in the CLI.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground mt-0.5">
                  3
                </span>
                <div className="space-y-2 w-full">
                  <p className="text-sm font-medium">Run the apply command</p>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-4 py-3 font-mono text-sm">
                    <TerminalIcon className="size-4 shrink-0 text-muted-foreground" />
                    <code className="flex-1 break-all text-foreground">
                      {APPLY_COMMAND}
                    </code>
                    <CopyButton text={APPLY_COMMAND} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Replace{' '}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono">
                      &lt;preset_id&gt;
                    </code>{' '}
                    with the ID you copied — that's it!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Tech Stack */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayersIcon className="size-4" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">What's included</h2>
              <p className="text-sm text-muted-foreground">
                Every layer of the stack is pre-configured and ready to go.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {TECH_STACK.map((group) => (
              <Card key={group.category}>
                <CardHeader className="pb-3">
                  <Badge variant="secondary" className="w-fit">
                    {group.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start justify-between gap-2 group"
                    >
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <ExternalLinkIcon className="size-3.5 mt-0.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Footer */}
        <section className="text-center text-sm text-muted-foreground space-y-1 pb-4">
          <p>
            Delete{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              src/routes/index.tsx
            </code>{' '}
            and replace it with your own pages when you're ready to build.
          </p>
          <p>Happy hacking! 🚀</p>
        </section>
      </main>
    </div>
  )
}
