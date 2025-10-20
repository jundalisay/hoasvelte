<script>
	import SparklingHighlight from '$lib/components/molecules/SparklingHighlight.svelte';
	import Socials from '$lib/components/molecules/Socials.svelte';
	import Image from '../atoms/Image.svelte';
</script>

<section id="">

	    <!-- <h2>Thông tin Trung tâm & <SparklingHighlight color="secondary">Ưu đãi</SparklingHighlight></h2> -->

    <h1>Trung tâm Yoga Hoa Sen</h1>

    <p style="text-align: center; margin-bottom: 30px; font-style: italic;">
        Tập yoga không chỉ giúp cơ thể khỏe mạnh – tinh thần an yên mà còn mang lại sự cân bằng trong cuộc sống.
    </p>

    <div class="card-container">
        <!-- CARD 1: Lịch học cố định hằng ngày -->
        <div class="card schedule-card">
            <h3>Lịch học cố định hằng ngày</h3>
            
            <div class="detail-item">
                <span class="label">Ca 1 (Sáng)</span>
                <span class="value">6h00 → 7h15</span>
            </div>
            
            <div class="detail-item">
                <span class="label">Ca 2 (Trưa)</span>
                <span class="value">11h30 → 12h45</span>
            </div>
            
            <div class="detail-item">
                <span class="label">Ca 3 (Chiều)</span>
                <span class="value">17h45 → 19h00</span>
            </div>
            
            <div class="detail-item">
                <span class="label">Ca 4 (Tối)</span>
                <span class="value">19h00 → 20h30</span>
            </div>
        </div>

        <!-- CARD 2: Địa chỉ, Liên hệ và Ưu đãi -->
        <div class="card info-promo-card">
            <h3>Thông tin Liên hệ & Ưu đãi</h3>

            <!-- Địa chỉ -->
            <div class="address-box">
                <span class="label" style="display: block; margin-bottom: 5px;">Địa chỉ</span>
                <span class="value" style="color: #333; font-weight: 400;">Trung tâm Yoga Hoa Sen – 34 Phan Liêm, Quận 1</span>
            </div>

            <!-- Liên hệ -->
            <div class="detail-item">
                <span class="label">Cô Châu (Liên hệ đăng ký)</span>
                <span class="value">0918.873.316</span>
            </div>
            <div class="detail-item">
                <span class="label">Cô Khanh (Liên hệ đăng ký)</span>
                <span class="value">0903.004.984</span>
            </div>
            
            <!-- Ưu đãi -->
            <div class="promo-header">Ưu đãi Đặc biệt (Đến hết năm 2025)</div>

            <div class="detail-item promo">
                <span class="label">Đóng 2 tháng học phí</span>
                <span class="value">Giảm 5%</span>
            </div>
            <div class="detail-item promo">
                <span class="label">Đóng 3 tháng học phí</span>
                <span class="value">Giảm 10%</span>
            </div>
            <div class="detail-item promo">
                <span class="label">Nhóm 5 người trở lên</span>
                <span class="value">Giảm 5%/hv/tháng</span>
            </div>
        </div>
    </div>

</section>


<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	#about {
		position: relative;
		display: grid;
		grid-template-columns: 500px 250px;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 50px;

		@include for-phone-only {
			grid-template-columns: 1fr;
			justify-items: center;
			gap: 20px;
		}

		.info {
			display: flex;
			flex-direction: column;
			gap: 10px;
			h2 {
				@include for-phone-only {
					text-align: center;
				}
			}

			p {
				@include for-phone-only {
					text-align: justify;
				}
			}

			@include for-phone-only {
				gap: 20px;
			}
		}

		.socials {
			display: flex;
			align-items: center;
			gap: 15px;

			@include for-phone-only {
				justify-content: center;
				margin-bottom: 10px;
				span {
					display: none;
				}
			}
		}

		.image {
			width: 220px;
			height: 220px;
		}
	}

/* CSS cơ bản và Typography */
        :root {
            --primary-color: orange; /* Green - Yoga theme */
            --secondary-color: forestgreen; /* Blue */
            --background-color: #f4f7f6;
            --card-bg: #ffffff;
            --border-radius: 12px;
            --shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: 'Roboto', sans-serif;
            background-color: var(--background-color);
            margin: 0;
            padding: 20px;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        h1 {
            color: var(--primary-color);
            margin-bottom: 25px;
            font-size: 2em;
            text-align: center;
        }
        
        /* Container chính chứa các Card - Flexbox cho Desktop */
        .card-container {
            display: flex;
            gap: 25px;
            width: 100%;
            max-width: 1200px;
            margin-bottom: 30px;
        }

        /* Styling cho từng Card */
        .card {
            flex: 1; /* Chia đều không gian trên desktop */
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            padding: 25px;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .card h3 {
            color: var(--secondary-color);
            border-bottom: 2px solid var(--secondary-color);
            padding-bottom: 10px;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        /* Layout chi tiết bên trong Card */
        .detail-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px dashed #eee;
        }

        .detail-item:last-child {
            border-bottom: none;
        }

        .label {
            font-weight: 700;
            color: #555;
        }

        .value {
            color: var(--primary-color);
            font-weight: 700;
            text-align: right;
        }

        /* Styling riêng cho bảng Ưu đãi */
        .promo .value {
            color: #E91E63; /* Pink for discounts */
        }
        
        .promo-header {
            background-color: #f0f8ff; /* Light background for promo header */
            padding: 10px;
            margin: 15px -25px 15px -25px; /* Extend full width of card */
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            text-align: center;
            font-weight: 700;
            color: var(--secondary-color);
        }
        
        .address-box {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }

        /* Media Query cho Mobile - Chuyển sang xếp dọc */
        @media (max-width: 768px) {
            .card-container {
                flex-direction: column; /* Xếp chồng dọc trên mobile */
                gap: 15px;
            }
            .card {
                flex: none; /* Bỏ qua flex 1 trên mobile */
                width: 100%;
            }
        }
</style>
