export const mixin = {
	data() {
		return {
			scrollTop: 0,
			isJump: Boolean,
      isJumpUp: Boolean,
			startY: 0, // 手指开始滑动的位置距离元素顶端的距离
			endY: 0,   // 手指停止滑动的位置距离元素顶端的距离
		}
	},
	methods: {
		initTouchMove() {
			const touchDom = this.$refs.move;
			touchDom.addEventListener('touchstart', this.touchStart)
			touchDom.addEventListener('touchend', this.touchEnd)
		},
		touchStart(event) {
			this.isJump = false;
      this.isJumpUp = false;
			this.startY = event.changedTouches[0].pageY
			window.addEventListener('scroll', this.moveHanddleScroll)
		},
		touchEnd(event) {
			let domH = this.$refs.move.offsetHeight
			let windowH = document.documentElement.clientHeight || document.body.clientHeight;
			let diffH = domH - windowH
			this.endY = event.changedTouches[0].pageY
			if ((this.scrollTop >= Math.abs(diffH) || this.scrollTop === 0) && (this.startY > this.endY)) {
				this.isJump = true;
        this.isJumpUp = false;
			} else if((this.scrollTop >= Math.abs(diffH) || this.scrollTop === 0) && this.startY < this.endY){
          this.isJumpUp = true;
          this.isJump = false;
      }else {
        this.isJumpUp = false;
        this.isJump = false;
      }
		},
		moveHanddleScroll() {
			this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		}
	}
}
