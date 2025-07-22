<template>
  <footer class="pb-[64px] pt-[36px] bg-bg-surface">
    <div class="footer-content flex flex-col justify-center items-center text-text-footer">
      <div class="flex items-center gap-[16px] text-sm mb-[16px]">
        <template v-for="(link, index) in footerLinks" :key="link.id">
          <a
            :href="link.href"
            class="font-regular"
            :class="{ '!font-medium text-[#131313]': index === footerLinks.length - 1 }"
            >{{ link.text }}</a
          >
          <span v-if="index < footerLinks.length - 1" class="separator">|</span>
        </template>
      </div>
      <p class="text-sm text-text-footer">Copyright&copy;2025 MODA Co.Ltd. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink {
  id: string;
  text: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { id: 'company', text: '회사소개', href: '#' },
  { id: 'notice', text: '공지사항', href: '#' },
  { id: 'faq', text: '자주묻는질문', href: '#' },
  { id: 'investment', text: '투자유의사항', href: '#' },
  { id: 'customer', text: '고객센터 1588-1588', href: '#' },
  { id: 'privacy', text: '개인정보처리방침', href: '#' },
];
</script>
