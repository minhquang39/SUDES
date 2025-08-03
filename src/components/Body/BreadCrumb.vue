<template>
  <nav class="breadcrumb-nav">
    <ol class="breadcrumb-list">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <router-link
          v-if="crumb.path && index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="breadcrumb-link"
        >
          {{ crumb.name }}
        </router-link>
        <span v-else class="breadcrumb-current">{{ crumb.name }}</span>
        <span v-if="index < breadcrumbs.length - 1" class="separator">›</span>
      </li>
    </ol>
  </nav>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    productData: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const route = useRoute()
    const breadcrumbs = ref([])

    const generateBreadcrumbs = () => {
      const crumbs = []

      crumbs.push({
        name: 'Trang chủ',
        path: '/',
      })

      if (route.name === 'product-detail' && props.productData && props.productData.category) {
        const categories = props.productData.category

        if (categories[0]) {
          crumbs.push({
            name: categories[0].name,
            path: `/danh-muc/${categories[0].slug}`,
          })
        }

        if (categories[1]) {
          crumbs.push({
            name: categories[1].name,
            path: `/danh-muc/${categories[1].slug}`,
          })
        }

        // Add product name as final breadcrumb
        crumbs.push({
          name: props.productData.name,
          path: null, // No path for current page
        })
      } else {
        // Process matched routes for other pages
        const matchedRoutes = route.matched.filter((match) => match.path !== '/')

        matchedRoutes.forEach((match, index) => {
          if (match.meta && match.meta.breadcrumb) {
            let name = match.meta.breadcrumb
            if (typeof name === 'function') {
              name = name(route)
            }

            const path = index === matchedRoutes.length - 1 ? route.path : match.path

            crumbs.push({
              name: name,
              path: path,
            })
          }
        })
      }

      breadcrumbs.value = crumbs
    }

    // Watch for route changes and product data changes
    watch([route, () => props.productData], generateBreadcrumbs, { immediate: true })

    return {
      breadcrumbs,
    }
  },
}
</script>

<style scoped>
.breadcrumb-nav {
  background-color: #f1e8d7; /* primaryBg */
  padding: 12px 0;
  border-radius: 0;
  font-size: 14px;
  color: #333333; /* textColor */
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid #e5e5e5;
}

.breadcrumb-list {
  list-style: none;
  padding: 0 14px;
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* Responsive padding */
@media (min-width: 1024px) {
  .breadcrumb-list {
    padding: 0 44px; /* lg:px-11 */
  }
}

@media (min-width: 1280px) {
  .breadcrumb-list {
    padding: 0 120px; /* xl:px-30 */
  }
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  text-decoration: none;
  color: #053024; /* mainColor */
  font-weight: 500;
  transition: color 0.2s ease;
  cursor: pointer;
}

.breadcrumb-link:hover {
  color: #d0a73c; /* hover */
  text-decoration: underline;
}

.breadcrumb-current {
  color: #053024; /* mainColor */
  font-weight: 600;
  cursor: default;
}

.separator {
  margin: 0 8px;
  color: #999;
  font-weight: normal;
  user-select: none;
  font-size: 16px;
}

/* Responsive design */
@media (max-width: 768px) {
  .breadcrumb-nav {
    padding: 8px 0;
    font-size: 13px;
  }

  .breadcrumb-list {
    padding: 0 14px;
  }

  .separator {
    margin: 0 6px;
    font-size: 14px;
  }

  .breadcrumb-link,
  .breadcrumb-current {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
