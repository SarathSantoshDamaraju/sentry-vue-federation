import { createApp, defineAsyncComponent } from 'vue';
import parent from './parent.vue';
import * as Sentry from "@sentry/vue";

const Content = defineAsyncComponent(() => import('child/Content'));
const Button = defineAsyncComponent(() => import('child/Button'));

const app = createApp(parent);

const EXTRA_KEY = "ROUTE_TO";

const transport = Sentry.makeMultiplexedTransport(Sentry.makeFetchTransport, (args) => {
  const event = args.getEvent();

  if (
    event &&
    event.extra &&
    EXTRA_KEY in event.extra &&
    Array.isArray(event.extra[EXTRA_KEY])
  ) {
    return event.extra[EXTRA_KEY];
  }
  return [];
});


Sentry.init({
    app,
    dsn: "__parent_DSN__",
    integrations: [Sentry.moduleMetadataIntegration()],
    transport,
  beforeSend: (event) => {
    if (event?.exception?.values?.[0].stacktrace.frames) {
      const frames = event.exception.values[0].stacktrace.frames;

      console.log(frames)
      // Find the last frame with module metadata containing a DSN
      const routeTo = frames
        .filter(
          (frame) => frame.module_metadata && frame.module_metadata.dsn,
        )
        .map((v) => v.module_metadata)
        .slice(-1); // using top frame only - you may want to customize this according to your needs

      if (routeTo.length) {
        event.extra = {
          ...event.extra,
          [EXTRA_KEY]: routeTo,
        };
      }
    }

    return event;
  },
  });

  
  Sentry.setUser({ email: "john.doe@example.com" });


app.component('content-element', Content);
app.component('button-element', Button);

app.mount('#app');
