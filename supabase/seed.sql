-- =========================================================
-- Red Sea Salt — Seed data
-- =========================================================
-- Run AFTER admin-schema.sql.
-- Idempotent — uses ON CONFLICT to upsert.
-- =========================================================

begin;

-- 1. Site content =========================================
insert into public.site_content (key, value_ar, value_en) values ('meta.siteName', 'ملح البحر الأحمر', 'Red Sea Salt')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('meta.tagline', 'مورد موثوق للملح الصناعي منذ 2011', 'Trusted industrial salt supplier since 2011')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('meta.description', 'شركة ملح البحر الأحمر — إنتاج وتوريد الملح الصناعي، ملح إزالة الجليد، ملح المسابح، الملح المكرر، والملح المغسول من رأس غارب، البحر الأحمر.', 'Red Sea Salt — producer and supplier of industrial salt, de-icing salt, pool salt, refined salt and double-washed salt from Ras Gharib, Red Sea, Egypt.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('home.hero.eyebrow', 'تأسست عام 2011 · مصر', 'Est. 2011 · Egypt')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('home.hero.title', 'ملح مصري نقي لأسواق العالم', 'Pure Egyptian salt for global markets')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('home.hero.subtitle', 'شركة مصرية لإنتاج الملح الصناعي والغذائي وملح إذابة الجليد وملح سيوة. نشحن من كافة الموانئ المصرية عبر شركائنا الموثوقين.', 'Producer of industrial salt, food-grade salt, de-icing salt and Siwa salt since 2011. We ship from every major Egyptian port through our trusted partners.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('home.about.body', 'نعمل منذ عام 2011 في إنتاج الملح الصناعي والغذائي وملح إذابة الجليد وملح سيوة بجودة عالية من مواقع متعددة داخل مصر، ونشحن من كافة الموانئ المصرية الكبرى عبر شركائنا الموثوقين — نخدم قطاعات الصناعة والغذاء والبنية التحتية في المنطقة.', 'Since 2011 we have produced premium industrial salt, food-grade salt, de-icing rock salt and Siwa salt across multiple Egyptian sites. We ship from every major Egyptian port through our trusted logistics partners — serving industrial, food and infrastructure buyers across the region.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('home.about.shippingTitle', 'شحن من كافة موانئ مصر', 'Shipping across Egypt')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('home.about.shippingBody', 'لسنا مقتصرين على البحر الأحمر — شركاؤنا الموثوقون يتولّون الشحن والتصدير من كل ميناء مصري كبير.', 'We''re not limited to the Red Sea — our trusted partners handle loading and export from every major Egyptian port.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('about.story.body', 'انطلقت شركة ملح البحر الأحمر عام 2011 برؤية واضحة: تقديم منتج ملحي عالي الجودة يلبي احتياجات الصناعة والبنية التحتية محليًا ودوليًا. على مدار أكثر من عقد، طورنا خطوط الإنتاج، ووسعنا شبكة التوريد، وبنينا شراكات طويلة الأمد مع كبرى الشركات في المنطقة.', 'Red Sea Salt was founded in 2011 with a clear vision: deliver high-grade salt that meets the needs of industry and infrastructure both locally and internationally. Over more than a decade we have expanded production lines, scaled the supply network and built long-term partnerships with major buyers in the region.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('about.mission.body', 'توفير منتجات ملحية نقية ومتوافقة مع المواصفات الصناعية، بجودة ثابتة وخدمة توريد موثوقة.', 'To provide pure, spec-compliant salt products with consistent quality and reliable supply.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('about.vision.body', 'أن نكون المورد الأول لمنتجات الملح في المنطقة من خلال الجودة والالتزام والابتكار.', 'To be the leading salt supplier in the region through quality, commitment and innovation.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('about.location.body', 'رأس غارب، محافظة البحر الأحمر، جمهورية مصر العربية — موقع استراتيجي يسهل الوصول البحري والبري.', 'Ras Gharib, Red Sea Governorate, Egypt — a strategic location with easy sea and land access.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('about.founder.name', 'رجب سالم', 'Ragab Salem')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('about.founder.role', 'مؤسس شركة ملح البحر الأحمر', 'Founder of Red Sea Salt Works')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('about.founder.tagline', 'خمسة عشر عامًا من التميّز — من قلب مصر إلى الأسواق العالمية.', '15 years of excellence — from Egypt''s heart to the global market.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('about.founder.body', 'بوصفي مؤسس شركة «ملح البحر الأحمر» منذ عام 2011، كرّست مسيرتي المهنية لتحويل الثروات الطبيعية في مصر إلى منتجات استراتيجية بمعايير عالمية. وبخبرة تقنية تتجاوز 15 عامًا في التبلور والنقاء الكيميائي، نوفّر الشراكة الأمثل للشركات الباحثة عن ملح مصري متميز. رسالتنا هي ردم الفجوة بين الإنتاج المحلي والمعايير الدولية، لضمان نجاح سلس في الأسواق العالمية.', 'As the founder of Red Sea Salt since 2011, I have dedicated my career to transforming Egypt''s natural resources into world-class strategic products. With over 15 years of technical expertise in crystallization and chemical purity, we provide the ultimate partnership for businesses seeking premium Egyptian salt. Our mission is to bridge the gap between local production and international standards, ensuring seamless success in global markets.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('contact.info.address', 'رأس غارب، البحر الأحمر، جمهورية مصر العربية', 'Ras Gharib, Red Sea Governorate, Egypt')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('contact.info.hoursValue', 'الأحد – الخميس: 9 صباحًا – 5 مساءً', 'Sunday – Thursday: 9am – 5pm')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q1.q', 'ما أنواع الملح التي توفرونها؟', 'What types of salt do you supply?')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q1.a', 'نوفر الملح الخام، وملح الطرق (إذابة الجليد)، وملح الأقراص، وملح معالجة المياه، والملح الصناعي، والملح الغذائي المُيوَّد، والملح البحري.', 'We supply raw salt, de-icing rock salt, tablet salt, water softener salt, industrial salt, food-grade (iodized) salt and marine/sea salt.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q2.q', 'هل توفرون كميات بالجملة؟', 'Do you offer bulk quantities?')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q2.a', 'نعم، نوفر كميات بالجملة مع خيارات تعبئة متعددة وطاقة إنتاجية كبيرة تلبي طلبات التصدير والتوريد المحلي.', 'Yes — we supply bulk quantities with flexible packaging and production capacity suited to export and local supply.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q3.q', 'هل تناسب منتجاتكم الاستخدام الصناعي والغذائي؟', 'Are your products suitable for industrial and food use?')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q3.a', 'نعم، نوفر منتجات مخصصة لكل قطاع وفق مواصفات معتمدة، ويمكن طلب بيانات المواصفات الفنية عند الطلب.', 'Yes — we produce grade-specific products with technical specifications available on request.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q4.q', 'ما نطاق التوريد والتسليم؟', 'What is your delivery area?')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q4.a', 'نخدم جميع المحافظات داخل مصر، كما نقوم بالتصدير إلى الأسواق الإقليمية والدولية عبر موانئ البحر الأحمر.', 'We serve all governorates within Egypt and export to regional and international markets via Red Sea ports.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q5.q', 'كيف أحصل على عرض سعر؟', 'How do I request a quote?')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('faq.items.q5.a', 'يمكنك تعبئة نموذج الاتصال على الموقع أو التواصل معنا عبر الهاتف أو واتساب وسنرد خلال 24 ساعة عمل.', 'Fill in the contact form on our website or reach out by phone or WhatsApp — we reply within one business day.')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;
insert into public.site_content (key, value_ar, value_en) values ('footer.tagline', 'مورد ملح موثوق', 'A trusted salt supplier')
  on conflict (key) do update set value_ar = excluded.value_ar, value_en = excluded.value_en;

-- 2. Products =============================================
insert into public.products_db (slug, featured, industries, specs, image, gallery, videos, display_order) values (
  'raw-salt', true, ARRAY['industrial', 'commercial']::text[], '{"purity":"95–97%","moisture":"≤ 4%","granule":"2–15 mm","packaging":["Bulk","50 kg bags","1 ton big bags"]}'::jsonb,
  '/products/raw-salt/1.jpg', ARRAY['/products/raw-salt/1.jpg', '/products/raw-salt/2.jpg', '/products/raw-salt/3.jpg']::text[], ARRAY['/products/raw-salt/video-1.mp4', '/products/raw-salt/video-2.mp4']::text[], 0
) on conflict (slug) do update set
  featured = excluded.featured, industries = excluded.industries, specs = excluded.specs,
  image = excluded.image, gallery = excluded.gallery, videos = excluded.videos,
  display_order = excluded.display_order;
insert into public.products_db (slug, featured, industries, specs, image, gallery, videos, display_order) values (
  'de-icing-rock-salt', true, ARRAY['road-deicing']::text[], '{"purity":"97 - 99%+","moisture":"≤ 1.5%","granule":"0–12 mm (coarse)","packaging":["Bulk","25 kg bags","1 ton big bags"]}'::jsonb,
  '/products/de-icing-rock-salt/a1.jpg', ARRAY['/products/de-icing-rock-salt/a1.jpg', '/products/de-icing-rock-salt/b1.jpeg', '/products/de-icing-rock-salt/b2.jpeg']::text[], ARRAY['/products/de-icing-rock-salt/video.mp4', '/products/de-icing-rock-salt/video-2.mp4', '/products/de-icing-rock-salt/video-3.mp4']::text[], 10
) on conflict (slug) do update set
  featured = excluded.featured, industries = excluded.industries, specs = excluded.specs,
  image = excluded.image, gallery = excluded.gallery, videos = excluded.videos,
  display_order = excluded.display_order;
insert into public.products_db (slug, featured, industries, specs, image, gallery, videos, display_order) values (
  'tablet-salt', true, ARRAY['industrial', 'commercial']::text[], '{"purity":"99.8%+","moisture":"≤ 0.1%","granule":"Pillow / round tablet — 25 mm","packaging":["10 kg bags","25 kg bags","1 ton big bags"]}'::jsonb,
  '/products/tablet-salt/a1.jpg', ARRAY['/products/tablet-salt/a1.jpg', '/products/tablet-salt/a2.jpeg', '/products/tablet-salt/a3.jpg', '/products/tablet-salt/a4.jpg']::text[], ARRAY['/products/tablet-salt/video-3.mp4', '/products/tablet-salt/video-2.mp4']::text[], 20
) on conflict (slug) do update set
  featured = excluded.featured, industries = excluded.industries, specs = excluded.specs,
  image = excluded.image, gallery = excluded.gallery, videos = excluded.videos,
  display_order = excluded.display_order;
insert into public.products_db (slug, featured, industries, specs, image, gallery, videos, display_order) values (
  'water-softener-salt', true, ARRAY['industrial', 'commercial']::text[], '{"purity":"99.5%+","moisture":"≤ 0.2%","granule":"Tablets / coarse granules","packaging":["25 kg bags","50 kg bags","Bulk"]}'::jsonb,
  '/products/water-softener-salt/ext-1.webp', ARRAY['/products/water-softener-salt/ext-1.webp']::text[], ARRAY['/products/water-softener-salt/video-1.mp4', '/products/water-softener-salt/video-2.mp4', '/products/water-softener-salt/video-3.mp4']::text[], 30
) on conflict (slug) do update set
  featured = excluded.featured, industries = excluded.industries, specs = excluded.specs,
  image = excluded.image, gallery = excluded.gallery, videos = excluded.videos,
  display_order = excluded.display_order;
insert into public.products_db (slug, featured, industries, specs, image, gallery, videos, display_order) values (
  'pool-salt', true, ARRAY['pools', 'commercial']::text[], '{"purity":"99.5%+","moisture":"≤ 0.2%","granule":"1–3 mm","packaging":["25 kg bags","50 kg bags","Bulk"]}'::jsonb,
  '/products/pool-salt/1.jpg', ARRAY['/products/pool-salt/1.jpg']::text[], ARRAY['/products/pool-salt/video-2.mp4']::text[], 40
) on conflict (slug) do update set
  featured = excluded.featured, industries = excluded.industries, specs = excluded.specs,
  image = excluded.image, gallery = excluded.gallery, videos = excluded.videos,
  display_order = excluded.display_order;
insert into public.products_db (slug, featured, industries, specs, image, gallery, videos, display_order) values (
  'industrial-salt', false, ARRAY['industrial', 'commercial']::text[], '{"purity":"97–98%","moisture":"≤ 3%","granule":"1–5 mm","packaging":["Bulk","50 kg bags"]}'::jsonb,
  '/products/industrial-salt/1.webp', ARRAY['/products/industrial-salt/1.webp', '/products/industrial-salt/2.webp', '/products/industrial-salt/3.jpeg']::text[], ARRAY['/products/industrial-salt/video.mp4']::text[], 50
) on conflict (slug) do update set
  featured = excluded.featured, industries = excluded.industries, specs = excluded.specs,
  image = excluded.image, gallery = excluded.gallery, videos = excluded.videos,
  display_order = excluded.display_order;
insert into public.products_db (slug, featured, industries, specs, image, gallery, videos, display_order) values (
  'food-grade-salt', true, ARRAY['food', 'commercial']::text[], '{"purity":"99.5%+","moisture":"≤ 0.2%","granule":"0.2–0.8 mm","packaging":["25 kg bags","50 kg bags","Retail packaging"]}'::jsonb,
  '/products/food-grade-salt/1.jpg', ARRAY['/products/food-grade-salt/1.jpg', '/products/food-grade-salt/2.jpg', '/products/food-grade-salt/3.jpg', '/products/food-grade-salt/4.jpeg']::text[], ARRAY[]::text[], 60
) on conflict (slug) do update set
  featured = excluded.featured, industries = excluded.industries, specs = excluded.specs,
  image = excluded.image, gallery = excluded.gallery, videos = excluded.videos,
  display_order = excluded.display_order;
insert into public.products_db (slug, featured, industries, specs, image, gallery, videos, display_order) values (
  'marine-salt', false, ARRAY['food', 'industrial', 'commercial']::text[], '{"purity":"97–99%","moisture":"≤ 2.5%","granule":"0.5–5 mm","packaging":["Bulk","25 kg bags","50 kg bags","1 ton big bags"]}'::jsonb,
  '/products/marine-salt/1.jpeg', ARRAY['/products/marine-salt/1.jpeg', '/products/marine-salt/2.jpeg', '/products/marine-salt/3.jpeg']::text[], ARRAY['/products/marine-salt/video-1.mp4', '/products/marine-salt/video-2.mp4']::text[], 70
) on conflict (slug) do update set
  featured = excluded.featured, industries = excluded.industries, specs = excluded.specs,
  image = excluded.image, gallery = excluded.gallery, videos = excluded.videos,
  display_order = excluded.display_order;

-- 3. Product translations ================================
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'raw-salt', 'ar', 'الملح الخام', 'بلورات ملح طبيعية شمسية وصخرية للاستخدام الصناعي بكميات كبيرة.', 'بلورات ملح طبيعية شمسية وصخرية يتم حصادها من ملاحاتنا داخل مصر، وتُصدَّر بكميات كبيرة للاستخدام الصناعي أو كمادة خام للتكرير اللاحق. يحتفظ بمكوناته المعدنية الطبيعية ونسبة من الرطوبة، مما يجعله خيارًا مثاليًا للعمليات الصناعية اللاحقة.',
  ARRAY['مستخرج طبيعيًا من أرض مصر', 'غني بالمعادن الطبيعية', 'مادة خام مثالية للتكرير والصناعات الكيميائية', 'متاح بكميات كبيرة جاهزة للتصدير', 'توريد منتظم ومستقر طوال العام', 'إنتاج معتمد بشهادة ISO 9001:2015']::text[], ARRAY['مدخلات كيميائية', 'التصدير بالجملة', 'تكرير الملح', 'العمليات الصناعية']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'raw-salt', 'en', 'Raw Salt', 'Natural solar and rock salt crystals in bulk for industrial use.', 'Natural solar and rock salt crystals harvested from our Egyptian salt sites and exported in bulk for industrial use or as a base material for further refining. Retains its natural mineral profile and some moisture, making it an ideal feedstock for downstream processing.',
  ARRAY['Naturally harvested from Egyptian land', 'Rich in native minerals', 'Ideal feedstock for refining and chemical processes', 'Available in large, export-ready volumes', 'Consistent, traceable supply year-round', 'ISO 9001:2015 certified production']::text[], ARRAY['Chemical feedstock', 'Bulk export', 'Salt refining', 'Industrial processes']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'de-icing-rock-salt', 'ar', 'ملح الطرق / إذابة الجليد', 'ملح صخري خشن من سيوة لخفض درجة تجمد الماء على الطرق.', 'ملح صخري خشن الحبيبات من منطقة سيوة، يُستخدم لخفض درجة تجمد الماء على الطرق السريعة ومدارج المطارات والبنية التحتية الحيوية. يتميز بحجم حبيبات وثبات محدد لضمان ذوبان سريع وموثوق للجليد حتى في ظل حركة مرور كثيفة.',
  ARRAY['حبيبات خشنة لتغطية سطحية طويلة الأمد', 'إذابة سريعة وموثوقة للجليد والثلج', 'مقاومة عالية لحركة المرور والاحتكاك', 'متوافق مع معدات النشر القياسية', 'متاح بالجملة وفي أكياس 1 طن', 'إنتاج معتمد بشهادة ISO 9001:2015']::text[], ARRAY['الطرق السريعة', 'مدارج المطارات', 'الجسور والكباري', 'الأرصفة الصناعية']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'de-icing-rock-salt', 'en', 'De-icing Rock Salt', 'Coarse Siwa rock salt that lowers the freezing point of water on roads.', 'Coarse-graded rock salt from Siwa, used to lower the freezing point of water on highways, airport runways and critical infrastructure. Graded for specific durability and grain size to deliver fast, reliable ice melt even under heavy traffic.',
  ARRAY['Coarse grain for long-lasting surface coverage', 'Fast, reliable ice and snow melt', 'Durable under traffic and abrasion', 'Compatible with standard spreading equipment', 'Supplied in bulk and 1-ton big bags', 'ISO 9001:2015 certified production']::text[], ARRAY['Highways', 'Airport runways', 'Bridges and overpasses', 'Industrial yards']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'tablet-salt', 'ar', 'ملح الأقراص', 'أقراص ملح مكرر بشكل وسادة لوحدات تليين ومعالجة المياه.', 'ملح مكرر مضغوط على شكل أقراص صغيرة بيضاء بشكل وسادة أو أقراص دائرية. مصمم ليذوب بانتظام دون أن يتفتت، لمنع انسداد أو تكتل وحدات تليين المياه وأنظمة المعالجة.',
  ARRAY['ملح مكرر عالي النقاء (≥ 99.8%)', 'شكل أقراص منتظم — بلا غبار أو كسور', 'ذوبان منتظم ومتوقع', 'يمنع الانسداد والتكتل', 'يُعبأ في أكياس 10 و25 كجم', 'إنتاج معتمد بشهادة ISO 9001:2015']::text[], ARRAY['أنظمة تليين المياه', 'معالجة المياه الصناعية', 'الغلايات التجارية', 'الاستخدام السكني']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'tablet-salt', 'en', 'Tablet Salt', 'Refined pillow-shaped salt tablets for softening and treatment units.', 'Refined salt compacted into small, white pillow-shaped or round tablets. Engineered to dissolve evenly without breaking apart, preventing clogging or bridging in water softening and treatment systems.',
  ARRAY['High-purity refined salt (≥ 99.8%)', 'Uniform tablet shape — no fines or dust', 'Even, predictable dissolution', 'Prevents bridging and clogging', 'Packaged in 10 kg and 25 kg bags', 'ISO 9001:2015 certified production']::text[], ARRAY['Water softening systems', 'Industrial water treatment', 'Commercial boilers', 'Residential use']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'water-softener-salt', 'ar', 'ملح معالجة المياه', 'أقراص وحبيبات خشنة لإزالة الكالسيوم والمغنسيوم من المياه العسرة.', 'ملح عالي النقاء يتوفر في هيئة أقراص أو حبيبات خشنة، مصمم لإزالة أيونات الكالسيوم والمغنسيوم من المياه العسرة. يُنشّط راتنجات التبادل الأيوني بكفاءة عالية ويطيل عمر الأجهزة والغلايات ودوائر المياه الصناعية.',
  ARRAY['يزيل عسر الكالسيوم والمغنسيوم', 'ذوبانية عالية ونسبة شوائب منخفضة', 'متاح على هيئة أقراص وحبيبات', 'يحمي الغلايات والأجهزة والأنابيب', 'أداء ثابت عبر دورات التنشيط', 'إنتاج معتمد بشهادة ISO 9001:2015']::text[], ARRAY['مليِّنات منزلية', 'مليِّنات تجارية', 'معالجة المياه الصناعية', 'التكييف والغلايات']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'water-softener-salt', 'en', 'Water Softener Salt', 'Tablets and coarse granules that remove calcium and magnesium from hard water.', 'High-purity salt available as tablets or coarse granules, formulated to remove calcium and magnesium ions from hard water. Regenerates ion-exchange resins efficiently and extends the life of appliances, boilers and industrial water circuits.',
  ARRAY['Removes calcium and magnesium hardness', 'High solubility and low insolubles', 'Tablet and granular formats available', 'Protects boilers, appliances and pipes', 'Consistent performance across regeneration cycles', 'ISO 9001:2015 certified production']::text[], ARRAY['Home softeners', 'Commercial softeners', 'Industrial water treatment', 'HVAC and boilers']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'pool-salt', 'ar', 'ملح حمامات السباحة', 'ملح عالي النقاء لأنظمة الكلور الملحي في المسابح.', 'ملح حمامات السباحة هو كلوريد صوديوم عالي النقاء مصمم خصيصاً لأنظمة التعقيم بالكلور الملحي. يختلف عن الملح العادي بخلوّه التام من مضادات التكتل واليود وأي إضافات قد تترك بقعاً على سطح المسبح أو تتلف خلايا المولّد. يذوب بسرعة ويغذّي مولّد الكلور لإنتاج ماء معقّم ألطف على البشرة والعينين من الكلور التقليدي.',
  ARRAY['كلوريد صوديوم نقي ≥ 99.5٪ — بدون إضافات', 'خالٍ من اليود ومضادات التكتل والمواد الرابطة', 'ذوبان سريع وبدون بقايا', 'متوافق مع كافة مولّدات الكلور الملحي', 'لطيف على البشرة والعينين والشعر ومعدات المسبح', 'إنتاج معتمد بشهادة ISO 9001:2015']::text[], ARRAY['المسابح المنزلية', 'المسابح التجارية', 'الفنادق والمنتجعات', 'النوادي الرياضية']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'pool-salt', 'en', 'Pool Salt', 'High-purity salt for saltwater chlorination pool systems.', 'Pool salt is pharmaceutical-grade sodium chloride designed specifically for saltwater chlorination systems. Unlike common salt, it contains no anti-caking agents, iodine, or additives that would stain pool surfaces or disrupt generator cells. It dissolves quickly and feeds the chlorine generator to produce a gentle, spa-like chlorinated water that is softer on skin and eyes than traditional chlorine.',
  ARRAY['≥ 99.5% pure sodium chloride — no additives', 'Free from iodine, anti-caking agents, and binders', 'Fast, residue-free dissolution', 'Compatible with all major saltwater chlorinators', 'Gentle on skin, eyes, hair, and pool equipment', 'ISO 9001:2015 certified production']::text[], ARRAY['Residential pools', 'Commercial pools', 'Hotels and resorts', 'Sports clubs']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'industrial-salt', 'ar', 'الملح الصناعي', 'ملح صناعي واسع الاستخدام للمصانع الكيميائية والنسيج والدباغة.', 'فئة واسعة من الملح الصناعي يُستخدم في المصانع الكيميائية وصباغة النسيج ودباغة الجلود والعديد من العمليات التصنيعية الأخرى. يُورَّد بما يتوافق مع المواصفات التقنية لكل استخدام.',
  ARRAY['نقاء وحجم حبيبات ثابت', 'رطوبة منخفضة تسهّل التداول', 'يلبي المواصفات الصناعية الشائعة', 'متاح بالجملة والأكياس والأكياس الكبيرة', 'تحاليل معملية عند الطلب', 'إنتاج معتمد بشهادة ISO 9001:2015']::text[], ARRAY['الصناعات الكيميائية', 'صباغة النسيج', 'دباغة الجلود', 'الصابون والمنظفات']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'industrial-salt', 'en', 'Industrial Salt', 'Broad-use industrial salt for chemical plants, textiles and tanning.', 'A broad category of industrial-grade salt used in chemical plants, textile dyeing, leather tanning and many other manufacturing processes. Supplied to meet the technical specifications of each application.',
  ARRAY['Consistent granulation and purity', 'Low moisture for reliable handling', 'Meets common industrial specifications', 'Available in bulk, bags and big bags', 'Backed by on-demand lab analysis', 'ISO 9001:2015 certified production']::text[], ARRAY['Chemical industry', 'Textile dyeing', 'Leather tanning', 'Soap and detergents']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'food-grade-salt', 'ar', 'الملح الغذائي', 'ملح مكرر ومُيوَّد مطابق للمواصفة المصرية 273.', 'ملح مكرر ومغسول بالكامل، مُدعَّم باليود وفقًا للمواصفة القياسية المصرية 273. خالٍ من المعادن الثقيلة والملوثات، وآمن للاستخدام الغذائي المباشر والتعبئة والتوزيع بالتجزئة.',
  ARRAY['مطابق للمواصفة المصرية 273', 'مُيوَّد بيودات البوتاسيوم', 'خالٍ من المعادن الثقيلة والملوثات', 'حبيبات ناعمة ومنتظمة بجودة غذائية', 'متاح بتعبئات بيع بالتجزئة وبالجملة', 'إنتاج معتمد بشهادة ISO 22000:2018 لسلامة الغذاء']::text[], ARRAY['مصانع الأغذية', 'ملح التعبئة والتجزئة', 'المطاعم والفنادق', 'الاستخدام المنزلي']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'food-grade-salt', 'en', 'Food Grade Salt', 'Fully refined, iodized salt compliant with Egyptian Standard 273.', 'Fully refined and washed salt, fortified with Iodine in accordance with Egyptian Standard 273. Free from heavy metals and contaminants, it is safe for direct food use, packaging and retail distribution.',
  ARRAY['Compliant with Egyptian Standard 273', 'Iodized (fortified with potassium iodate)', 'Free from heavy metals and contaminants', 'Fine, uniform food-grade granulation', 'Available in retail and bulk packaging', 'ISO 22000:2018 certified food-safety management']::text[], ARRAY['Food manufacturers', 'Packaged retail salt', 'Restaurants and hotels', 'Household use']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'marine-salt', 'ar', 'الملح البحري', 'ملح بحري شمسي غني بالمعادن الطبيعية.', 'يُحصد من الملاحات الساحلية على البحر الأحمر، ويتميز الملح البحري بمحتواه الطبيعي من المعادن وببلوراته النظيفة. منتج متعدد الاستخدامات ومطلوب في الأسواق الصناعية والغذائية الفاخرة على حد سواء.',
  ARRAY['تبخير شمسي طبيعي', 'محتوى معدني طبيعي غني', 'بلورات نظيفة ولامعة', 'مناسب للاستخدام الصناعي والغذائي الفاخر', 'مغسول ومدرَّج في الموقع', 'إنتاج معتمد بشهادة ISO 9001:2015']::text[], ARRAY['علامات غذائية فاخرة', 'تجزئة جورميه', 'الاستخدام الصناعي', 'أسواق التصدير']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;
insert into public.product_translations (product_slug, locale, name, short, description, key_features, applications) values (
  'marine-salt', 'en', 'Marine Salt / Sea Salt', 'Solar-harvested sea salt with a rich natural mineral profile.', 'Harvested from coastal salt works along the Red Sea, marine salt is prized for its natural mineral profile and clean crystal structure. A versatile product in demand across both industrial and premium food markets.',
  ARRAY['Naturally solar-evaporated', 'Rich natural mineral profile', 'Clean, bright crystal structure', 'Suitable for industrial and premium food use', 'Washed and graded on site', 'ISO 9001:2015 certified production']::text[], ARRAY['Premium food brands', 'Gourmet retail', 'Industrial use', 'Export markets']::text[]
) on conflict (product_slug, locale) do update set
  name = excluded.name, short = excluded.short, description = excluded.description,
  key_features = excluded.key_features, applications = excluded.applications;

commit;

-- =========================================================
-- Verify after running:
--   select count(*) from public.site_content;     -- expects 30
--   select count(*) from public.products_db;       -- expects 8
--   select count(*) from public.product_translations;  -- expects 16
-- =========================================================
