export interface DocPage {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  content: {
    overview: string;
    subsections?: {
      title: string;
      body: string;
      code?: {
        language: string;
        filename?: string;
        snippet: string;
      };
    }[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  };
}

export const DOC_SECTIONS = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'quickstart', title: 'Quickstart' },
      { id: 'authentication', title: 'Authentication' },
    ],
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    items: [
      { id: 'instances', title: 'Instances' },
      { id: 'messages', title: 'Messages' },
      { id: 'contacts-groups', title: 'Contacts & Groups' },
      { id: 'webhooks', title: 'Webhooks' },
    ],
  },
  {
    id: 'mcp',
    title: 'MCP',
    items: [
      { id: 'mcp-overview', title: 'Overview' },
      { id: 'mcp-discovery', title: 'Categorical discovery' },
      { id: 'mcp-tokens', title: 'Personal Access Tokens' },
      { id: 'mcp-tools', title: 'Tools' },
      { id: 'mcp-scopes', title: 'Scope enforcement' },
    ],
  },
  {
    id: 'sdks',
    title: 'SDKs',
    items: [
      { id: 'curl', title: 'cURL' },
      { id: 'python', title: 'Python' },
      { id: 'node', title: 'Node.js' },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    items: [
      { id: 'first-message', title: 'Send your first message' },
      { id: 'mcp-client', title: 'Set up an MCP client' },
      { id: 'webhook-verify', title: 'Webhook signature verification' },
    ],
  },
];

export const DOC_PAGES: Record<string, DocPage> = {
  introduction: {
    id: 'introduction',
    sectionId: 'getting-started',
    title: 'Introduction',
    description: 'What Viventure is, who it is built for, and our architectural guarantees.',
    content: {
      overview:
        'Viventure is an infrastructure-less WhatsApp Business API gateway engineered exclusively for developers, agentic systems, and high-throughput products. We eliminate container orchestration, session dropouts, and proprietary protocol wrappers by exposing clean REST endpoints and first-class Model Context Protocol (MCP) primitives.',
      subsections: [
        {
          title: 'Who Viventure is for',
          body: 'Engineers building production notification systems, conversational AI agents (Claude, Cursor, custom LLM pipelines), and SaaS products that require multi-tenant WhatsApp communication without managing telephony clusters.',
        },
        {
          title: 'What Viventure is not',
          body: 'Viventure is not a drag-and-drop marketing campaign tool or a bloated CRM with slow UI. We provide an unopinionated, high-velocity developer infrastructure layer designed to be driven entirely via code and automated agents.',
        },
        {
          title: 'Architectural Guarantees',
          body: 'Every request is backed by AES-256 encryption at rest, at-least-once signed webhook dispatching with dead-letter queue recovery, and a canonical 99.9% uptime SLA.',
        },
      ],
    },
  },

  quickstart: {
    id: 'quickstart',
    sectionId: 'getting-started',
    title: 'Quickstart',
    description: 'Connect a WhatsApp number and dispatch your first payload in under 2 minutes.',
    content: {
      overview: 'Follow these five steps to spin up an isolated instance, pair your phone, and send a message.',
      subsections: [
        {
          title: '1. Obtain your Personal Access Token (PAT)',
          body: 'Generate a PAT from your Viventure dashboard with instances:write and messages:send permissions.',
        },
        {
          title: '2. Provision an instance container',
          body: 'Execute a POST request to provision a dedicated WhatsApp instance.',
          code: {
            language: 'bash',
            filename: 'create-instance.sh',
            snippet: `curl -X POST https://api.viventure.dev/v1/instances \\
  -H "Authorization: Bearer YOUR_PAT" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Production Bot 01"}'`,
          },
        },
        {
          title: '3. Scan pairing QR Code',
          body: 'Request the base64 pairing QR payload or raw pairing string to link your WhatsApp Business mobile client.',
          code: {
            language: 'bash',
            filename: 'get-qr.sh',
            snippet: `curl https://api.viventure.dev/v1/instances/inst_abc123/connect \\
  -H "Authorization: Bearer YOUR_PAT"`,
          },
        },
        {
          title: '4. Transmit message',
          body: 'Once connected, push text or interactive components immediately.',
          code: {
            language: 'bash',
            filename: 'send-message.sh',
            snippet: `curl -X POST https://api.viventure.dev/v1/instances/inst_abc123/messages/send \\
  -H "Authorization: Bearer YOUR_PAT" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+12025550100",
    "content": {
      "type": "text",
      "text": "Hello world from Viventure API!"
    }
  }'`,
          },
        },
      ],
    },
  },

  authentication: {
    id: 'authentication',
    sectionId: 'getting-started',
    title: 'Authentication',
    description: 'Personal Access Tokens, scope hierarchies, and session security.',
    content: {
      overview:
        'All requests to the Viventure API (Base URL: https://api.viventure.dev/v1) must include a valid Bearer token in the HTTP Authorization header. We employ granular Personal Access Tokens (PATs) for machine-to-machine, CLI, and MCP requests, alongside secure httpOnly cookies in the web dashboard.',
      subsections: [
        {
          title: 'Authorization Header',
          body: 'Pass the token in standard Bearer format on all HTTP and JSON-RPC calls.',
          code: {
            language: 'http',
            filename: 'headers',
            snippet: `Authorization: Bearer vvn_live_948f2c019d8e77a1c3...
Content-Type: application/json`,
          },
        },
        {
          title: 'PAT vs Session Cookies',
          body: 'Web sessions use short-lived encrypted cookies with CSRF defense. Machine and MCP traffic strictly rely on PATs, which are scoped, revocable on demand, and audit-logged.',
        },
      ],
      table: {
        headers: ['Scope', 'Category', 'Description'],
        rows: [
          ['instances:read', 'Instances', 'List and inspect instance health and status'],
          ['instances:write', 'Instances', 'Create, restart, pair, and delete instances'],
          ['messages:send', 'Messages', 'Transmit outbound text, media, and interactive payloads'],
          ['messages:read', 'Messages', 'Query message delivery receipts and thread logs'],
          ['webhooks:read', 'Webhooks', 'Inspect active webhook endpoints and failed dispatches'],
          ['webhooks:write', 'Webhooks', 'Register and update URLs and secret signing keys'],
          ['account:read', 'Account', 'View billing quota, plan tier, and audit events'],
        ],
      },
    },
  },

  instances: {
    id: 'instances',
    sectionId: 'api-reference',
    title: 'Instances API',
    description: 'Programmatically provision, pair, and cycle WhatsApp numbers.',
    content: {
      overview:
        'Instances represent isolated WhatsApp client sessions. Each instance has an immutable identifier (inst_xxx) and maintains isolated cryptographic keypairs and socket connections.',
      subsections: [
        {
          title: 'List Instances: GET /v1/instances',
          body: 'Returns an array of all instances registered under your organization with live connection state.',
          code: {
            language: 'bash',
            filename: 'list-instances.sh',
            snippet: `curl https://api.viventure.dev/v1/instances \\
  -H "Authorization: Bearer YOUR_PAT"`,
          },
        },
        {
          title: 'Create Instance: POST /v1/instances',
          body: 'Provisions a new instance container ready for pairing.',
          code: {
            language: 'bash',
            filename: 'create-instance.sh',
            snippet: `curl -X POST https://api.viventure.dev/v1/instances \\
  -H "Authorization: Bearer YOUR_PAT" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Support Line", "webhookUrl": "https://myapp.com/webhooks/whatsapp"}'`,
          },
        },
        {
          title: 'Response Schema',
          body: 'Standard 201 Created payload format:',
          code: {
            language: 'json',
            filename: 'instance-response.json',
            snippet: `{
  "id": "inst_912kc83d",
  "name": "Support Line",
  "status": "disconnected",
  "phoneNumber": null,
  "createdAt": "2026-10-07T12:00:00Z",
  "lastSeen": null
}`,
          },
        },
      ],
    },
  },

  messages: {
    id: 'messages',
    sectionId: 'api-reference',
    title: 'Messages API',
    description: 'Send texts, documents, media, and location payloads with idempotency.',
    content: {
      overview:
        'The messages endpoint allows sending text, media, and structured interactive messages. Pass an Idempotency-Key header to prevent duplicate dispatch during retries.',
      subsections: [
        {
          title: 'Send Message: POST /v1/instances/:id/messages/send',
          body: 'Dispatches an outbound message to an E.164 phone number.',
          code: {
            language: 'bash',
            filename: 'send-message.sh',
            snippet: `curl -X POST https://api.viventure.dev/v1/instances/inst_912kc83d/messages/send \\
  -H "Authorization: Bearer YOUR_PAT" \\
  -H "Idempotency-Key: msg_req_8923a10f" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+12025550100",
    "content": {
      "type": "text",
      "text": "Your order #4491 has shipped. Tracking: https://track.example.com"
    }
  }'`,
          },
        },
        {
          title: 'Media Message Payload',
          body: 'Provide direct HTTPS asset URLs. Viventure streams and signs the media attachment on the fly.',
          code: {
            language: 'json',
            filename: 'media-payload.json',
            snippet: `{
  "to": "+12025550100",
  "content": {
    "type": "image",
    "url": "https://cdn.example.com/receipts/rec_891.png",
    "caption": "Order receipt copy"
  }
}`,
          },
        },
      ],
    },
  },

  'contacts-groups': {
    id: 'contacts-groups',
    sectionId: 'api-reference',
    title: 'Contacts & Groups API',
    description: 'Inspect WhatsApp contacts, query presence, and manage group chats.',
    content: {
      overview: 'Inspect contact verification status, fetch profile pictures, and manage group participants.',
      subsections: [
        {
          title: 'Verify Number: GET /v1/instances/:id/contacts/verify?phone=+12025550100',
          body: 'Verifies whether a target phone number is registered on WhatsApp.',
          code: {
            language: 'json',
            filename: 'verify-response.json',
            snippet: `{
  "exists": true,
  "jid": "12025550100@s.whatsapp.net",
  "business": true
}`,
          },
        },
        {
          title: 'Create Group: POST /v1/instances/:id/groups',
          body: 'Creates a group conversation with initial participants.',
          code: {
            language: 'bash',
            filename: 'create-group.sh',
            snippet: `curl -X POST https://api.viventure.dev/v1/instances/inst_912kc83d/groups \\
  -H "Authorization: Bearer YOUR_PAT" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "Incident War Room #102",
    "participants": ["+12025550100", "+12025550199"]
  }'`,
          },
        },
      ],
    },
  },

  webhooks: {
    id: 'webhooks',
    sectionId: 'api-reference',
    title: 'Webhooks API',
    description: 'At-least-once delivery, signed payloads, and dead-letter queue retries.',
    content: {
      overview:
        'Viventure dispatches real-time HTTPS webhooks for inbound messages, status receipts (sent, delivered, read), and instance state changes. Every payload is signed with HMAC-SHA256.',
      subsections: [
        {
          title: 'Signature Verification Header',
          body: 'Compare the X-Viventure-Signature header with HMAC SHA-256 of the raw body using your webhook secret.',
          code: {
            language: 'bash',
            filename: 'signature-header',
            snippet: `X-Viventure-Signature: sha256=d3b07384d113edec49eaa6238ad5ff00...
X-Viventure-Timestamp: 1728345600
X-Viventure-Delivery: dlv_908f12a`,
          },
        },
        {
          title: 'Retry & Dead-Letter Queue Policy',
          body: 'If your server returns a non-2xx status code, Viventure retries with exponential backoff at 1m, 5m, 15m, 1h, and 6h intervals before queuing in the Dead-Letter Queue (DLQ).',
        },
      ],
    },
  },

  'mcp-overview': {
    id: 'mcp-overview',
    sectionId: 'mcp',
    title: 'MCP — Overview',
    description: 'Model Context Protocol integration for Claude, Cursor, and autonomous agents.',
    content: {
      overview:
        'Viventure is built from the ground up for the Model Context Protocol (MCP). Traditional tool providers flood LLMs with 40+ tool definitions that overwhelm context windows and confuse routing. Viventure uses categorical discovery and strict JSON-RPC 2.0 over HTTPS.',
      subsections: [
        {
          title: 'Why MCP-Native Matters',
          body: 'Instead of spending hours writing custom WhatsApp integration glue for Claude Desktop or Cursor, add one entry to your client config. Your agent can list numbers, send updates, and check replies with full scope isolation.',
        },
        {
          title: 'Gateway Endpoint',
          body: 'All MCP operations execute over standard HTTP POST at https://api.viventure.dev/v1/platform/mcp/invoke.',
        },
      ],
    },
  },

  'mcp-discovery': {
    id: 'mcp-discovery',
    sectionId: 'mcp',
    title: 'MCP — Categorical Discovery',
    description: 'Two-step tool discovery that saves context tokens and eliminates hallucinated parameters.',
    content: {
      overview:
        'Rather than dumping 30+ schema definitions into the model context at system boot, Viventure implements categorical discovery: Step 1 lists categories; Step 2 fetches only the required category tools.',
      subsections: [
        {
          title: 'Step 1 — Discover Categories',
          body: 'Call the list_categories tool to see available domains.',
          code: {
            language: 'json',
            filename: 'step1-request.json',
            snippet: `POST /v1/platform/mcp/invoke
{
  "tool": "list_categories"
}

// Response
{
  "categories": [
    { "name": "instances", "toolCount": 9, "description": "Provision and cycle numbers" },
    { "name": "messages", "toolCount": 4, "description": "Send and read WhatsApp chats" },
    { "name": "webhooks", "toolCount": 6, "description": "Webhook routing and retries" }
  ]
}`,
          },
        },
        {
          title: 'Step 2 — Get Tools for a Category',
          body: 'Call list_tools with a specific category to obtain full JSON Schemas only for that domain.',
          code: {
            language: 'json',
            filename: 'step2-request.json',
            snippet: `POST /v1/platform/mcp/invoke
{
  "tool": "list_tools",
  "parameters": {
    "category": "messages"
  }
}`,
          },
        },
      ],
    },
  },

  'mcp-tokens': {
    id: 'mcp-tokens',
    sectionId: 'mcp',
    title: 'MCP — Personal Access Tokens',
    description: 'Scope enforcement rules and permissions matrix for AI agents.',
    content: {
      overview:
        'When connecting an LLM or autonomous system via MCP, granting broad admin access is an unacceptable security risk. Viventure enforces granular token scopes before any tool is dispatched.',
      subsections: [
        {
          title: 'Recommended MCP Scopes',
          body: 'For general AI assistance: provide messages:send, messages:read, and instances:read. Never supply instances:write unless the agent is specifically intended to provision infrastructure.',
        },
      ],
      table: {
        headers: ['Tool Name', 'Required Scope', 'Risk Level'],
        rows: [
          ['list_instances', 'instances:read', 'Low'],
          ['get_instance_status', 'instances:read', 'Low'],
          ['create_instance', 'instances:write', 'Medium'],
          ['delete_instance', 'instances:write', 'High'],
          ['send_message', 'messages:send', 'Medium'],
          ['get_messages', 'messages:read', 'Low'],
          ['create_webhook', 'webhooks:write', 'Medium'],
        ],
      },
    },
  },

  'mcp-tools': {
    id: 'mcp-tools',
    sectionId: 'mcp',
    title: 'MCP — Complete Tools Catalog',
    description: 'Full list of 19 tools exposed via the Viventure MCP gateway.',
    content: {
      overview:
        'The following tools are available via POST /v1/platform/mcp/invoke when the associated PAT scopes are satisfied.',
      table: {
        headers: ['Category', 'Tool', 'Description'],
        rows: [
          ['Instances', 'list_instances', 'List all WhatsApp instances under current account'],
          ['Instances', 'get_instance', 'Fetch connection status, battery, and phone info'],
          ['Instances', 'create_instance', 'Provision a new isolated WhatsApp instance container'],
          ['Instances', 'delete_instance', 'Tear down and wipe instance data'],
          ['Instances', 'connect_instance', 'Generate QR code or pairing code string'],
          ['Instances', 'disconnect_instance', 'Log out and unlink WhatsApp web session'],
          ['Instances', 'restart_instance', 'Soft reboot internal socket connection'],
          ['Instances', 'get_qr_code', 'Retrieve active base64 QR code image'],
          ['Instances', 'set_instance_name', 'Update instance friendly display name'],
          ['Messages', 'send_message', 'Dispatch text message payload to E.164 phone number'],
          ['Messages', 'send_media', 'Send image, PDF, audio, or video URL attachment'],
          ['Messages', 'get_message_status', 'Check read receipt and delivery state'],
          ['Messages', 'send_location', 'Transmit geographic coordinates with label'],
          ['Webhooks', 'list_webhooks', 'Inspect registered webhook endpoints'],
          ['Webhooks', 'create_webhook', 'Register new webhook URL and subscribe to topics'],
          ['Webhooks', 'delete_webhook', 'Remove webhook listener by ID'],
          ['Webhooks', 'test_webhook', 'Dispatch mock ping event to verify connectivity'],
          ['Webhooks', 'list_failed_deliveries', 'Inspect payloads stored in dead-letter queue'],
          ['Webhooks', 'retry_delivery', 'Force re-dispatch of a failed webhook event'],
        ],
      },
    },
  },

  'mcp-scopes': {
    id: 'mcp-scopes',
    sectionId: 'mcp',
    title: 'MCP — Scope Enforcement',
    description: 'Deterministic security rejection when an agent attempts unpermitted actions.',
    content: {
      overview:
        'If an agent attempts to invoke an MCP tool without the requisite scope granted on the PAT, the gateway rejects execution immediately with standard JSON-RPC 2.0 error code -32007 (Insufficient Scope). The underlying WhatsApp instance is never touched.',
      subsections: [
        {
          title: 'Example: Scope Rejection Payload',
          body: 'A token with only messages:send attempting to call delete_instance receives this error:',
          code: {
            language: 'json',
            filename: 'error-response.json',
            snippet: `{
  "jsonrpc": "2.0",
  "id": "req_88190b",
  "error": {
    "code": -32007,
    "message": "Scope enforcement failed: tool 'delete_instance' requires 'instances:write'",
    "data": {
      "grantedScopes": ["messages:send"],
      "missingScope": "instances:write"
    }
  }
}`,
          },
        },
      ],
    },
  },

  curl: {
    id: 'curl',
    sectionId: 'sdks',
    title: 'cURL Reference',
    description: 'Standard HTTP examples for shell scripting and CI/CD pipelines.',
    content: {
      overview: 'Viventure adheres strictly to HTTP standards, making cURL a first-class citizen.',
      subsections: [
        {
          title: 'Send WhatsApp Text with cURL',
          body: 'Single command message dispatch with Bearer token authentication.',
          code: {
            language: 'bash',
            filename: 'curl-send.sh',
            snippet: `curl -X POST https://api.viventure.dev/v1/instances/inst_abc123/messages/send \\
  -H "Authorization: Bearer YOUR_PAT" \\
  -H "Content-Type: application/json" \\
  -d '{"to":"+12025550100","content":{"type":"text","text":"Hello from cURL"}}'`,
          },
        },
      ],
    },
  },

  python: {
    id: 'python',
    sectionId: 'sdks',
    title: 'Python SDK & Requests',
    description: 'Clean Python integration using requests or httpx.',
    content: {
      overview: 'Integrate Viventure into Django, FastAPI, Celery, or LangChain agents in a few lines of Python.',
      subsections: [
        {
          title: 'Python Example',
          body: 'Sending a message using standard requests library:',
          code: {
            language: 'python',
            filename: 'viventure_client.py',
            snippet: `import requests

PAT = "vvn_live_YOUR_TOKEN"
INSTANCE_ID = "inst_abc123"

def send_whatsapp(to_number: str, text: str):
    url = f"https://api.viventure.dev/v1/instances/{INSTANCE_ID}/messages/send"
    headers = {
        "Authorization": f"Bearer {PAT}",
        "Content-Type": "application/json"
    }
    payload = {
        "to": to_number,
        "content": {"type": "text", "text": text}
    }
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()

print(send_whatsapp("+12025550100", "Hello from Python!"))`,
          },
        },
      ],
    },
  },

  node: {
    id: 'node',
    sectionId: 'sdks',
    title: 'Node.js & TypeScript',
    description: 'Native fetch and TypeScript types for modern Node and Edge runtimes.',
    content: {
      overview: 'Works seamlessly in Node 18+, Bun, Deno, and Cloudflare Workers.',
      subsections: [
        {
          title: 'TypeScript Example',
          body: 'Dispatching messages using native fetch:',
          code: {
            language: 'typescript',
            filename: 'sender.ts',
            snippet: `interface SendMessageResponse {
  messageId: string;
  status: 'queued' | 'sent';
  timestamp: string;
}

export async function sendWhatsAppMessage(
  instanceId: string,
  to: string,
  text: string
): Promise<SendMessageResponse> {
  const res = await fetch(\`https://api.viventure.dev/v1/instances/\${instanceId}/messages/send\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.VIVENTURE_PAT}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to,
      content: { type: 'text', text },
    }),
  });

  if (!res.ok) {
    throw new Error(\`Viventure API Error: \${res.status} \${await res.text()}\`);
  }

  return res.json();
}`,
          },
        },
      ],
    },
  },

  'first-message': {
    id: 'first-message',
    sectionId: 'guides',
    title: 'Send your first message',
    description: 'Step-by-step walkthrough from zero to sent message in 90 seconds.',
    content: {
      overview:
        'This guide takes you through verifying number formatting (E.164), checking deliverability, and handling the sent confirmation response.',
      subsections: [
        {
          title: 'Phone Number Formatting',
          body: 'All recipient numbers must follow international E.164 format including country code (e.g., +12025550100, +447911123456). No spaces, parentheses, or dashes.',
        },
      ],
    },
  },

  'mcp-client': {
    id: 'mcp-client',
    sectionId: 'guides',
    title: 'Set up an MCP client',
    description: 'Connect Claude Desktop and Cursor directly to Viventure.',
    content: {
      overview: 'Configure your local AI environment to chat, search, and message through WhatsApp.',
      subsections: [
        {
          title: 'Claude Desktop Configuration',
          body: 'Add the following block to ~/Library/Application Support/Claude/claude_desktop_config.json:',
          code: {
            language: 'json',
            filename: 'claude_desktop_config.json',
            snippet: `{
  "mcpServers": {
    "viventure": {
      "command": "npx",
      "args": ["-y", "@viventure/mcp-gateway"],
      "env": {
        "VIVENTURE_PAT": "vvn_live_YOUR_TOKEN",
        "VIVENTURE_DEFAULT_INSTANCE": "inst_abc123"
      }
    }
  }
}`,
          },
        },
      ],
    },
  },

  'webhook-verify': {
    id: 'webhook-verify',
    sectionId: 'guides',
    title: 'Webhook signature verification',
    description: 'Verify HMAC-SHA256 signatures in Node.js and Python.',
    content: {
      overview:
        'Always verify incoming webhooks before processing them to protect against replay and spoofing attacks.',
      subsections: [
        {
          title: 'Node.js Verification Example',
          body: 'Using standard crypto module:',
          code: {
            language: 'typescript',
            filename: 'verifyWebhook.ts',
            snippet: `import crypto from 'node:crypto';

export function verifyViventureSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string
): boolean {
  const [prefix, hash] = signatureHeader.split('=');
  if (prefix !== 'sha256' || !hash) return false;

  const expectedHash = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(hash, 'utf8'),
    Buffer.from(expectedHash, 'utf8')
  );
}`,
          },
        },
      ],
    },
  },
};
