<template>
  <div class="bg-primaryBg">
    <div class="px-[14px] md:px-[45px]">
      <div class="flex py-[10px] font-medium leading-[24px]">
        <span>Trang chủ</span>
        <span>></span>
        <span>Đăng nhập tài khoản</span>
      </div>
      <div class="grid grid-cols-12 pt-[25px] pb-[40px]">
        <div class="hidden md:block md:col-span-4"></div>
        <div class="col-span-12 md:block md:col-span-4 bg-white px-[15px] py-[20px]">
          <div class="">
            <h1 class="text-center font-medium text-2xl uppercase mb-[20px]">Đăng ký</h1>

            <form action="">
              <div class="mb-[15px]">
                <input
                  type="email"
                  placeholder="Họ"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none"
                />
              </div>
              <div class="mb-[15px]">
                <input
                  type="email"
                  placeholder="Tên"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none"
                />
              </div>
              <div class="mb-[15px]">
                <input
                  type="email"
                  placeholder="Email"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none"
                />
              </div>
              <div class="mb-[15px]">
                <input
                  type="email"
                  placeholder="Số điện thoại"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none"
                />
              </div>
              <div class="mb-[15px]">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none"
                />
              </div>

              <div class="bg-mainColor p-1">
                <div class="text-center font-bold text-white border border-white p-1">Đăng ký</div>
              </div>
            </form>

            <p class="text-center text-sm">Hoặc đăng nhập bằng</p>
            <div class="flex justify-center gap-3 my-7">
              <img
                src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                width="129"
                height="37"
                alt=""
              />
              <img
                src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                width="129"
                height="37"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="hidden md:block md:col-span-4"></div>
      </div>
    </div>
  </div>
</template>
