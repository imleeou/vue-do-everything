import { useRouter, useRoute, RouteLocationRaw } from 'vue-router'

const useRouterHook = () => {
  const router = useRouter(),
    route = useRoute()

  const back = () => {
    router.back()
  }

  const routerPush = (to: RouteLocationRaw) => {
    router.push(to)
  }

  const routerReplace = (to: RouteLocationRaw) => {
    router.replace(to)
  }

  const routerGo = (delta: number) => {
    router.go(delta)
  }

  return {
    router,
    route,
    back,
    routerPush,
    routerReplace,
    routerGo
  }
}

export default useRouterHook
