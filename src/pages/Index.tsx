import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  battery: string;
  capacity: string;
  flavors: string[];
  bestseller?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("catalog");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "LUXE Gold Edition",
      price: 12990,
      image: "/img/daf37f7b-5e93-450d-8a70-c93497024116.jpg",
      battery: "1500mAh",
      capacity: "6ml",
      flavors: ["Табак", "Мята", "Ваниль"],
      bestseller: true
    },
    {
      id: 2,
      name: "PREMIUM Black Pro",
      price: 15990,
      image: "/img/80aa64bc-7e77-4746-950a-43432c796349.jpg",
      battery: "2000mAh",
      capacity: "8ml",
      flavors: ["Ягоды", "Цитрус", "Кофе"],
      bestseller: true
    },
    {
      id: 3,
      name: "ELITE Signature",
      price: 18990,
      image: "/img/6ac5aa12-2085-414f-9430-60ca35e6b7fe.jpg",
      battery: "2500mAh",
      capacity: "10ml",
      flavors: ["Шоколад", "Карамель", "Мята"],
    },
    {
      id: 4,
      name: "ROYAL Diamond",
      price: 21990,
      image: "/img/daf37f7b-5e93-450d-8a70-c93497024116.jpg",
      battery: "3000mAh",
      capacity: "12ml",
      flavors: ["Фрукты", "Десерт", "Классик"],
      bestseller: true
    },
    {
      id: 5,
      name: "IMPERIAL Gold",
      price: 9990,
      image: "/img/80aa64bc-7e77-4746-950a-43432c796349.jpg",
      battery: "1200mAh",
      capacity: "5ml",
      flavors: ["Табак", "Ментол"],
    },
    {
      id: 6,
      name: "PRESTIGE Noir",
      price: 16990,
      image: "/img/6ac5aa12-2085-414f-9430-60ca35e6b7fe.jpg",
      battery: "2200mAh",
      capacity: "9ml",
      flavors: ["Ваниль", "Кофе", "Шоколад"],
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const reviews = [
    { name: "Александр", rating: 5, text: "Отличное качество, батарея держит целый день!" },
    { name: "Мария", rating: 5, text: "Элегантный дизайн, приятный вкус. Рекомендую!" },
    { name: "Дмитрий", rating: 4, text: "Хороший продукт за свои деньги. Доставка быстрая." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-luxury-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-gold">
              PREMIUM VAPE
            </h1>
            <nav className="hidden md:flex items-center gap-8">
              {["catalog", "about", "delivery", "reviews", "contacts"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-montserrat text-sm uppercase tracking-wider transition-all hover:text-luxury-gold ${
                    activeSection === section ? "text-luxury-gold" : "text-white"
                  }`}
                >
                  {section === "catalog" && "Каталог"}
                  {section === "about" && "О бренде"}
                  {section === "delivery" && "Доставка"}
                  {section === "reviews" && "Отзывы"}
                  {section === "contacts" && "Контакты"}
                </button>
              ))}
            </nav>
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:text-luxury-gold">
                  <Icon name="ShoppingCart" size={24} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-luxury-gold text-black">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="font-playfair text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-playfair font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto"
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Итого:</span>
                        <span className="text-luxury-gold">{cartTotal.toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full bg-luxury-gold text-black hover:bg-luxury-gold/90" size="lg">
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {activeSection === "catalog" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="luxury-gradient-reverse py-24 px-8 rounded-2xl mb-16 text-center">
                <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 animate-fade-in">
                  Премиальные устройства
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto font-montserrat">
                  Откройте для себя мир изысканных вкусов и технологий
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-2xl transition-all duration-300 animate-scale-in overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.bestseller && (
                          <Badge className="absolute top-4 right-4 bg-luxury-gold text-black">
                            Бестселлер
                          </Badge>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-playfair font-semibold mb-2">
                          {product.name}
                        </h3>
                        <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Icon name="Battery" size={16} />
                            {product.battery}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Droplet" size={16} />
                            {product.capacity}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.flavors.map((flavor) => (
                            <Badge key={flavor} variant="outline" className="text-xs">
                              {flavor}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-playfair font-bold text-luxury-gold">
                            {product.price.toLocaleString()} ₽
                          </span>
                          <Button
                            onClick={() => addToCart(product)}
                            className="bg-luxury-black text-white hover:bg-luxury-gold hover:text-black transition-all"
                          >
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            В корзину
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === "about" && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-5xl font-playfair font-bold text-center mb-12 animate-fade-in">
                О бренде
              </h2>
              <div className="space-y-6 text-lg font-montserrat">
                <p className="leading-relaxed">
                  Premium Vape — это эксклюзивный бренд премиальных устройств для вейпинга, 
                  созданный для тех, кто ценит качество, стиль и инновации.
                </p>
                <p className="leading-relaxed">
                  Каждое наше устройство разработано с использованием передовых технологий 
                  и отборных материалов. Мы гордимся тем, что создаём продукцию класса люкс, 
                  которая сочетает в себе элегантный дизайн и безупречную функциональность.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="font-playfair font-semibold text-xl mb-2">Премиум качество</h3>
                    <p className="text-muted-foreground">Только лучшие материалы</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="font-playfair font-semibold text-xl mb-2">Инновации</h3>
                    <p className="text-muted-foreground">Передовые технологии</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="font-playfair font-semibold text-xl mb-2">Дизайн</h3>
                    <p className="text-muted-foreground">Элегантный стиль</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "delivery" && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-5xl font-playfair font-bold text-center mb-12 animate-fade-in">
                Доставка
              </h2>
              <div className="grid gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Icon name="Truck" size={32} className="text-luxury-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-playfair font-semibold text-xl mb-2">
                          Курьерская доставка
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Доставка по Москве в течение 24 часов. Стоимость — 500 ₽.
                        </p>
                        <p className="text-sm">При заказе от 20 000 ₽ — доставка бесплатно</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Icon name="MapPin" size={32} className="text-luxury-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-playfair font-semibold text-xl mb-2">
                          Пункты выдачи
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Более 200 пунктов выдачи по всей России. Стоимость — 300 ₽.
                        </p>
                        <p className="text-sm">Срок доставки: 2-5 рабочих дней</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Icon name="Store" size={32} className="text-luxury-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-playfair font-semibold text-xl mb-2">
                          Самовывоз
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Забрать заказ можно из нашего флагманского магазина в центре Москвы.
                        </p>
                        <p className="text-sm">Бесплатно. Готовность заказа — 2 часа.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === "reviews" && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-5xl font-playfair font-bold text-center mb-12 animate-fade-in">
                Отзывы
              </h2>
              <div className="grid gap-6">
                {reviews.map((review, index) => (
                  <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-playfair font-semibold text-xl">{review.name}</h3>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Icon key={i} name="Star" size={16} className="text-luxury-gold fill-luxury-gold" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === "contacts" && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-5xl font-playfair font-bold text-center mb-12 animate-fade-in">
                Контакты
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={24} className="text-luxury-gold" />
                      <div>
                        <p className="font-semibold">Телефон</p>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={24} className="text-luxury-gold" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-muted-foreground">info@premiumvape.ru</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={24} className="text-luxury-gold" />
                      <div>
                        <p className="font-semibold">Адрес</p>
                        <p className="text-muted-foreground">
                          Москва, ул. Тверская, д. 1
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" size={24} className="text-luxury-gold" />
                      <div>
                        <p className="font-semibold">Режим работы</p>
                        <p className="text-muted-foreground">Ежедневно 10:00 - 22:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="luxury-gradient-reverse text-white">
                  <CardContent className="p-6">
                    <h3 className="font-playfair text-2xl font-bold mb-4">Остались вопросы?</h3>
                    <p className="mb-4 opacity-90">
                      Наши специалисты с радостью проконсультируют вас по любым вопросам.
                    </p>
                    <Button className="w-full bg-white text-black hover:bg-white/90">
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      Написать в чат
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-luxury-black text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-luxury-gold mb-4">
                PREMIUM VAPE
              </h3>
              <p className="text-white/70">
                Эксклюзивные устройства премиум-класса для истинных ценителей.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-white/70">
                <li><button onClick={() => setActiveSection("catalog")} className="hover:text-luxury-gold transition">Каталог</button></li>
                <li><button onClick={() => setActiveSection("about")} className="hover:text-luxury-gold transition">О бренде</button></li>
                <li><button onClick={() => setActiveSection("delivery")} className="hover:text-luxury-gold transition">Доставка</button></li>
                <li><button onClick={() => setActiveSection("reviews")} className="hover:text-luxury-gold transition">Отзывы</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-white/70">
                <li>+7 (495) 123-45-67</li>
                <li>info@premiumvape.ru</li>
                <li>Москва, ул. Тверская, д. 1</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-white/20" />
          <p className="text-center text-white/50 text-sm">
            © 2024 Premium Vape. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;