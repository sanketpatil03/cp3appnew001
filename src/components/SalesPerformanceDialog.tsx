import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X, TrendingUp, AlertCircle } from "lucide-react";

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
    { month: "Apr'23", target: 100000, actual: 98000, achievement: 98.0 },
    { month: "May'23", target: 105000, actual: 102000, achievement: 97.1 },
    { month: "Jun'23", target: 110000, actual: 115000, achievement: 104.5 },
    { month: "Jul'23", target: 115000, actual: 112000, achievement: 97.4 },
    { month: "Aug'23", target: 120000, actual: 125000, achievement: 104.2 },
    { month: "Sep'23", target: 125000, actual: 120000, achievement: 96.0 },
  ];

  // Secondary Sales data
  const secondarySalesData = [
    { month: "Apr'23", target: 95000, actual: 92000, achievement: 96.8 },
    { month: "May'23", target: 100000, actual: 98000, achievement: 98.0 },
    { month: "Jun'23", target: 105000, actual: 110000, achievement: 104.8 },
    { month: "Jul'23", target: 110000, actual: 108000, achievement: 98.2 },
    { month: "Aug'23", target: 115000, actual: 120000, achievement: 104.3 },
    { month: "Sep'23", target: 120000, actual: 115000, achievement: 95.8 },
  ];

  // Brand insights
  const brandInsights = [
    { brand: "Aprox", status: "underperforming", message: "23% below target in Q2", color: "destructive" },
    { brand: "Bprox", status: "performing", message: "8% above target consistently", color: "success" },
    { brand: "Cprox", status: "attention", message: "Declining trend for 3 months", color: "warning" },
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
                        <TableHead className="text-right">Achievement %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {primarySalesData.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">{row.month}</TableCell>
                          <TableCell className="text-right">{row.target.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="link"
                              className="p-0 h-auto text-primary font-medium hover:underline"
                              onClick={() => handleActualClick(row.month)}
                            >
                              {row.actual.toLocaleString()}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={row.achievement >= 100 ? "text-success font-semibold" : "text-warning font-semibold"}>
                              {row.achievement}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Brand Insights Section */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Brand-Related Insights</h3>
                <div className="space-y-3">
                  {brandInsights.map((insight) => (
                    <Card
                      key={insight.brand}
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4"
                      style={{ 
                        borderLeftColor: 
                          insight.color === "destructive" ? "hsl(var(--destructive))" : 
                          insight.color === "success" ? "hsl(var(--success))" : 
                          "hsl(var(--warning))"
                      }}
                      onClick={() => handleBrandClick(insight.brand)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertCircle className={`w-5 h-5 ${
                            insight.color === "destructive" ? "text-destructive" : 
                            insight.color === "success" ? "text-success" : 
                            "text-warning"
                          }`} />
                          <div>
                            <p className="font-semibold">{insight.brand}</p>
                            <p className="text-sm text-muted-foreground">{insight.message}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details →
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="secondary" className="space-y-6 mt-6">
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
                        <TableHead className="text-right">Achievement %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {secondarySalesData.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">{row.month}</TableCell>
                          <TableCell className="text-right">{row.target.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="link"
                              className="p-0 h-auto text-primary font-medium hover:underline"
                              onClick={() => handleActualClick(row.month)}
                            >
                              {row.actual.toLocaleString()}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={row.achievement >= 100 ? "text-success font-semibold" : "text-warning font-semibold"}>
                              {row.achievement}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Brand Insights Section */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Brand-Related Insights</h3>
                <div className="space-y-3">
                  {brandInsights.map((insight) => (
                    <Card
                      key={insight.brand}
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4"
                      style={{ 
                        borderLeftColor: 
                          insight.color === "destructive" ? "hsl(var(--destructive))" : 
                          insight.color === "success" ? "hsl(var(--success))" : 
                          "hsl(var(--warning))"
                      }}
                      onClick={() => handleBrandClick(insight.brand)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertCircle className={`w-5 h-5 ${
                            insight.color === "destructive" ? "text-destructive" : 
                            insight.color === "success" ? "text-success" : 
                            "text-warning"
                          }`} />
                          <div>
                            <p className="font-semibold">{insight.brand}</p>
                            <p className="text-sm text-muted-foreground">{insight.message}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details →
                        </Button>
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
