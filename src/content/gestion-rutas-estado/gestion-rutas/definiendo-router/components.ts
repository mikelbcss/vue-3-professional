import { createApp, defineComponent, h, onBeforeUnmount, onMounted, type Ref } from 'vue';
import { type Router, RouterLink, RouterView, useRouter } from 'vue-router';
import { Button } from '../../../../components/ui';

export const Home = defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    return () =>
      h('div', { class: 'space-y-2 flex flex-col gap-2' }, [
        h('h3', { class: 'font-semibold' }, 'Home'),
        h('div', { class: 'space-x-2' }, [
          h(RouterLink, { class: 'underline', to: '/' }, { default: () => 'Home' }),
          h('span', null, '|'),
          h(RouterLink, { class: 'underline', to: '/about' }, { default: () => 'About' }),
        ]),
        h(Button, { onClick: () => router.push({ name: 'about' }) }, 'Ir a About'),
        h(Button, { onClick: () => router.push({ name: 'not-found' }) }, 'Ir a ruta inexistente'),
      ]);
  },
});

export const About = defineComponent({
  name: 'About',
  setup() {
    const router = useRouter();
    return () =>
      h('div', { class: 'space-y-2' }, [
        h('h3', { class: 'font-semibold' }, 'About'),
        h('div', { class: 'space-x-2' }, [
          h(RouterLink, { to: '/', class: 'underline' }, { default: () => 'Home' }),
          h('span', null, '|'),
          h(RouterLink, { to: '/about', class: 'underline' }, { default: () => 'About' }),
        ]),
        h(Button, { class: 'btn', onClick: () => router.push({ name: 'home' }) }, 'Volver a Home'),
      ]);
  },
});

export const NotFound = defineComponent({
  name: 'NotFound',
  setup() {
    const router = useRouter();
    return () =>
      h('div', [
        h('h3', { class: 'font-semibold' }, 'Not found'),
        h(Button, { onClick: () => router.push({ name: 'home' }) }, 'Volver a Home'),
      ]);
  },
});

export const useSandBoxRouter = (router: Router, mountEl: Ref<HTMLElement | null>) => {
  let app: ReturnType<typeof createApp> | null = null;

  onMounted(async () => {
    if (!mountEl.value) return;
    app = createApp({
      render: () => h(RouterView),
    });
    app.use(router);
    app.mount(mountEl.value);
  });

  onBeforeUnmount(() => {
    if (app) {
      app.unmount();
      app = null;
    }
  });
};
