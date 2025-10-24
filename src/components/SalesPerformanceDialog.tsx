import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X, TrendingUp, AlertCircle } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface SalesPerformanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ProductBreakdown {
  month: string;
  product: string;
  quantity: number;
  value: number;
}

interface BrandYTDData {
  month: string;
  target: number;
  actual: number;
  achievement: number;
}

export const SalesPerformanceDialog = ({ open, onOpenChange }: SalesPerformanceDialogProps) => {
  const [productBreakdownOpen, setProductBreakdownOpen] = useState(false);
  const [selectedMonthProducts, setSelectedMonthProducts] = useState<ProductBreakdown[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  
  const [brandYTDOpen, setBrandYTDOpen] = useState(false);
  const [selectedBrandName, setSelectedBrandName] = useState("");
  const [brandYTDData, setBrandYTDData] = useState<BrandYTDData[]>([]);

  // Primary Sales data
  const primarySalesData = [
    { month: "Jan", target: 10000, actual: 9000, past: 3000, achievement: 90.0 },
    { month: "Feb", target: 20000, actual: 15000, past: 9000, achievement: 75.0 },
    { month: "Mar", target: 30000, actual: 18000, past: 14500, achievement: 60.0 },
    { month: "Apr", target: 38000, actual: 25000, past: 21800, achievement: 66.0 },
    { month: "May", target: 45000, actual: 35000, past: 31300, achievement: 78.0 },
    { month: "Jun", target: 50000, actual: 40000, past: 36500, achievement: 80.0 },
    { month: "Jul", target: 55000, actual: 45000, past: 41500, achievement: 82.0 },
    { month: "Aug", target: 60000, actual: 50000, past: 46500, achievement: 83.0 },
    { month: "Sep", target: 70000, actual: 57000, past: 53500, achievement: 81.0 },
    { month: "Oct", target: 80000, actual: 64000, past: 58500, achievement: 80.0 },
    { month: "Nov", target: 90000, actual: 0, past: 63700, achievement: 0 },
    { month: "Dec", target: 100000, actual: 0, past: 76000, achievement: 0 },
  ];

  // Secondary Sales data
  const secondarySalesData = [
    { month: "Jan", target: 9500, actual: 8500, past: 2800, achievement: 89.5 },
    { month: "Feb", target: 19000, actual: 14200, past: 8500, achievement: 74.7 },
    { month: "Mar", target: 28500, actual: 17100, past: 13800, achievement: 60.0 },
    { month: "Apr", target: 36100, actual: 23750, past: 20710, achievement: 65.8 },
    { month: "May", target: 42750, actual: 33250, past: 29735, achievement: 77.8 },
    { month: "Jun", target: 47500, actual: 38000, past: 34675, achievement: 80.0 },
    { month: "Jul", target: 52250, actual: 42750, past: 39425, achievement: 81.8 },
    { month: "Aug", target: 57000, actual: 47500, past: 44175, achievement: 83.3 },
    { month: "Sep", target: 66500, actual: 54150, past: 50825, achievement: 81.4 },
    { month: "Oct", target: 76000, actual: 60800, past: 55575, achievement: 80.0 },
    { month: "Nov", target: 85500, actual: 0, past: 60515, achievement: 0 },
    { month: "Dec", target: 95000, actual: 0, past: 72200, achievement: 0 },
  ];

  // Brand insights
  const brandInsights = [
    { 
      brand: "Lupin Tiotropium", 
      status: "underperforming", 
      message: "Sales dropped 10% last month in your territory; competitor launched promotional campaign. Prescription frequency reduced by 15%.",
      suggestion: "Increase detailing calls to doctors who switched brands; share new clinical data.",
      color: "destructive" 
    },
    { 
      brand: "Lupin Azithromycin", 
      status: "attention", 
      message: "Stock shortages reported at 3 key distributors, causing delayed deliveries.",
      suggestion: "Coordinate with distributor and scheduler to ensure timely restocking.",
      color: "warning" 
    },
    { 
      brand: "Lupin Salmeterol", 
      status: "performing", 
      message: "High brand loyalty from top 5 prescribers; multiple recent positive feedback.",
      suggestion: "Send appreciation notes to doctors and invite them to upcoming medical events.",
      color: "success" 
    },
    { 
      brand: "Lupin Glimepiride", 
      status: "attention", 
      message: "Moderate sales but rising competitor threat; secondary sales lagging by 20%.",
      suggestion: "Increase chemist engagement and inventory audits to boost availability.",
      color: "warning" 
    },
  ];

  // Mock product breakdown data
  const getProductBreakdown = (month: string): ProductBreakdown[] => {
    return [
      { month, product: "Aprox 10mg", quantity: 450, value: 45000 },
      { month, product: "Aprox 20mg", quantity: 320, value: 38400 },
      { month, product: "Bprox 5mg", quantity: 280, value: 28000 },
      { month, product: "Cprox 15mg", quantity: 190, value: 28500 },
    ];
  };

  // Mock brand YTD data
  const getBrandYTDData = (brand: string): BrandYTDData[] => {
    return [
      { month: "Apr'23", target: 25000, actual: 23000, achievement: 92.0 },
      { month: "May'23", target: 26000, actual: 24500, achievement: 94.2 },
      { month: "Jun'23", target: 27000, actual: 28000, achievement: 103.7 },
      { month: "Jul'23", target: 28000, actual: 27200, achievement: 97.1 },
      { month: "Aug'23", target: 29000, actual: 30100, achievement: 103.8 },
      { month: "Sep'23", target: 30000, actual: 29500, achievement: 98.3 },
    ];
  };

  const handleActualClick = (month: string) => {
    setSelectedMonth(month);
    setSelectedMonthProducts(getProductBreakdown(month));
    setProductBreakdownOpen(true);
  };

  const handleBrandClick = (brand: string) => {
    setSelectedBrandName(brand);
    setBrandYTDData(getBrandYTDData(brand));
    setBrandYTDOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Sales Performance
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="primary">Primary Sales</TabsTrigger>
              <TabsTrigger value="secondary">Secondary Sales</TabsTrigger>
            </TabsList>

            <TabsContent value="primary" className="space-y-6 mt-6">
              {/* Trend Chart */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Primary Sales Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={primarySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="target" stroke="#2563eb" strokeWidth={2} name="Target" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="actual" stroke="#f97316" strokeWidth={2} name="Actuals" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="past" stroke="#16a34a" strokeWidth={2} name="Past" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Table View */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Performance Overview</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Target (₹)</TableHead>
                        <TableHead className="text-right">Actual (₹)</TableHead>
                        <TableHead className="text-right">Past (₹)</TableHead>
                        <TableHead className="text-right">Achievement %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {primarySalesData.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">{row.month}</TableCell>
                          <TableCell className="text-right">{row.target.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            {row.actual > 0 ? (
                              <Button
                                variant="link"
                                className="p-0 h-auto text-primary font-medium hover:underline"
                                onClick={() => handleActualClick(row.month)}
                              >
                                {row.actual.toLocaleString()}
                              </Button>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">{row.past.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            {row.achievement > 0 ? (
                              <span className={row.achievement >= 100 ? "text-success font-semibold" : "text-warning font-semibold"}>
                                {row.achievement}%
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Brand Performance Section */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Brand Performance</h3>
                <div className="space-y-3">
                  {brandInsights.map((insight) => (
                    <Card
                      key={insight.brand}
                      className="p-5 cursor-pointer hover:shadow-md transition-shadow border-l-4"
                      style={{ 
                        borderLeftColor: 
                          insight.color === "destructive" ? "hsl(var(--destructive))" : 
                          insight.color === "success" ? "hsl(var(--success))" : 
                          "hsl(var(--warning))"
                      }}
                      onClick={() => handleBrandClick(insight.brand)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-base text-primary">{insight.brand}</h4>
                          <Button variant="ghost" size="sm" className="text-xs">
                            View Details →
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed">{insight.message}</p>
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Suggestion:</span> {insight.suggestion}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="secondary" className="space-y-6 mt-6">
              {/* Trend Chart */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Secondary Sales Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={secondarySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="target" stroke="#2563eb" strokeWidth={2} name="Target" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="actual" stroke="#f97316" strokeWidth={2} name="Actuals" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="past" stroke="#16a34a" strokeWidth={2} name="Past" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Table View */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Performance Overview</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Target (₹)</TableHead>
                        <TableHead className="text-right">Actual (₹)</TableHead>
                        <TableHead className="text-right">Past (₹)</TableHead>
                        <TableHead className="text-right">Achievement %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {secondarySalesData.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">{row.month}</TableCell>
                          <TableCell className="text-right">{row.target.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            {row.actual > 0 ? (
                              <Button
                                variant="link"
                                className="p-0 h-auto text-primary font-medium hover:underline"
                                onClick={() => handleActualClick(row.month)}
                              >
                                {row.actual.toLocaleString()}
                              </Button>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">{row.past.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            {row.achievement > 0 ? (
                              <span className={row.achievement >= 100 ? "text-success font-semibold" : "text-warning font-semibold"}>
                                {row.achievement}%
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Brand Performance Section */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Brand Performance</h3>
                <div className="space-y-3">
                  {brandInsights.map((insight) => (
                    <Card
                      key={insight.brand}
                      className="p-5 cursor-pointer hover:shadow-md transition-shadow border-l-4"
                      style={{ 
                        borderLeftColor: 
                          insight.color === "destructive" ? "hsl(var(--destructive))" : 
                          insight.color === "success" ? "hsl(var(--success))" : 
                          "hsl(var(--warning))"
                      }}
                      onClick={() => handleBrandClick(insight.brand)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-base text-primary">{insight.brand}</h4>
                          <Button variant="ghost" size="sm" className="text-xs">
                            View Details →
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed">{insight.message}</p>
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Suggestion:</span> {insight.suggestion}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Product Breakdown Dialog */}
      <Dialog open={productBreakdownOpen} onOpenChange={setProductBreakdownOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Breakdown - {selectedMonth}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Value (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedMonthProducts.map((product, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{product.product}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell className="text-right font-semibold">{product.value.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {selectedMonthProducts.reduce((sum, p) => sum + p.quantity, 0)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ₹{selectedMonthProducts.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Brand YTD Performance Dialog */}
      <Dialog open={brandYTDOpen} onOpenChange={setBrandYTDOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Brand Performance - {selectedBrandName} (YTD)</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Month-wise Performance</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Target (₹)</TableHead>
                      <TableHead className="text-right">Actual (₹)</TableHead>
                      <TableHead className="text-right">Achievement %</TableHead>
                      <TableHead className="text-right">Variance (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brandYTDData.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell className="font-medium">{row.month}</TableCell>
                        <TableCell className="text-right">{row.target.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold">{row.actual.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <span className={row.achievement >= 100 ? "text-success font-semibold" : "text-destructive font-semibold"}>
                            {row.achievement}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={row.actual >= row.target ? "text-success" : "text-destructive"}>
                            {row.actual >= row.target ? "+" : ""}{(row.actual - row.target).toLocaleString()}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell>Total YTD</TableCell>
                      <TableCell className="text-right">
                        {brandYTDData.reduce((sum, r) => sum + r.target, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {brandYTDData.reduce((sum, r) => sum + r.actual, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {((brandYTDData.reduce((sum, r) => sum + r.actual, 0) / 
                           brandYTDData.reduce((sum, r) => sum + r.target, 0)) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">
                        {(brandYTDData.reduce((sum, r) => sum + r.actual - r.target, 0)).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
