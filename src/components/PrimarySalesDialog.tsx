import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, ChevronRight } from "lucide-react";
import { useState } from "react";

interface PrimarySalesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrimarySalesDialog = ({ open, onOpenChange }: PrimarySalesDialogProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const trendData = [
    { month: "Jan", "2025": 42000, "2024": 38000 },
    { month: "Feb", "2025": 45000, "2024": 41000 },
    { month: "Mar", "2025": 48500, "2024": 43500 },
    { month: "Apr", "2025": 52000, "2024": 46000 },
    { month: "May", "2025": 55500, "2024": 48500 },
    { month: "Jun", "2025": 58000, "2024": 51000 },
    { month: "Jul", "2025": 61500, "2024": 53500 },
    { month: "Aug", "2025": 64000, "2024": 56000 },
    { month: "Sep", "2025": 67500, "2024": 58500 },
    { month: "Oct", "2025": 70500, "2024": 61000 },
  ];

  const tableData = [
    { month: "January", "2025": 42000, "2024": 38000, growth: "+10.5%" },
    { month: "February", "2025": 45000, "2024": 41000, growth: "+9.8%" },
    { month: "March", "2025": 48500, "2024": 43500, growth: "+11.5%" },
    { month: "April", "2025": 52000, "2024": 46000, growth: "+13.0%" },
    { month: "May", "2025": 55500, "2024": 48500, growth: "+14.4%" },
    { month: "June", "2025": 58000, "2024": 51000, growth: "+13.7%" },
    { month: "July", "2025": 61500, "2024": 53500, growth: "+15.0%" },
    { month: "August", "2025": 64000, "2024": 56000, growth: "+14.3%" },
    { month: "September", "2025": 67500, "2024": 58500, growth: "+15.4%" },
    { month: "October", "2025": 70500, "2024": 61000, growth: "+15.6%" },
  ];

  const products = [
    { 
      name: "Cardipro 50mg", 
      status: "performing", 
      change: "+18%", 
      insight: "Strong momentum with increasing prescription rates among cardiologists",
      monthlyData: [
        { month: "Jan", sales: 8500, target: 8000 },
        { month: "Feb", sales: 9200, target: 8500 },
        { month: "Mar", sales: 10100, target: 9000 },
        { month: "Apr", sales: 11200, target: 9500 },
        { month: "May", sales: 12500, target: 10500 },
        { month: "Jun", sales: 13800, target: 11500 },
        { month: "Jul", sales: 14800, target: 12500 },
        { month: "Aug", sales: 15500, target: 13000 },
        { month: "Sep", sales: 16200, target: 13500 },
        { month: "Oct", sales: 17000, target: 14000 },
        { month: "Nov", sales: 17500, target: 14500 },
        { month: "Dec", sales: 18200, target: 15000 },
      ]
    },
    { 
      name: "Diabetrol XR", 
      status: "performing", 
      change: "+12%", 
      insight: "Steady growth in tier-2 cities, good acceptance among diabetologists",
      monthlyData: [
        { month: "Jan", sales: 12000, target: 11500 },
        { month: "Feb", sales: 12800, target: 12000 },
        { month: "Mar", sales: 13500, target: 12500 },
        { month: "Apr", sales: 14200, target: 13000 },
        { month: "May", sales: 15000, target: 13500 },
        { month: "Jun", sales: 15800, target: 14000 },
        { month: "Jul", sales: 16500, target: 14500 },
        { month: "Aug", sales: 17200, target: 15000 },
        { month: "Sep", sales: 17900, target: 15500 },
        { month: "Oct", sales: 18500, target: 16000 },
        { month: "Nov", sales: 19200, target: 16500 },
        { month: "Dec", sales: 20000, target: 17000 },
      ]
    },
    { 
      name: "Painrelief Plus", 
      status: "underperforming", 
      change: "-8%", 
      insight: "Declining engagement - competitor launched similar product at lower price",
      monthlyData: [
        { month: "Jan", sales: 9500, target: 10000 },
        { month: "Feb", sales: 9200, target: 10200 },
        { month: "Mar", sales: 8800, target: 10500 },
        { month: "Apr", sales: 8500, target: 10800 },
        { month: "May", sales: 8200, target: 11000 },
        { month: "Jun", sales: 7900, target: 11200 },
        { month: "Jul", sales: 7600, target: 11500 },
        { month: "Aug", sales: 7400, target: 11800 },
        { month: "Sep", sales: 7200, target: 12000 },
        { month: "Oct", sales: 7000, target: 12200 },
        { month: "Nov", sales: 6900, target: 12500 },
        { month: "Dec", sales: 6800, target: 12800 },
      ]
    },
    { 
      name: "Antibiox 500", 
      status: "performing", 
      change: "+15%", 
      insight: "Consistent performance across general physicians and pediatricians",
      monthlyData: [
        { month: "Jan", sales: 14000, target: 13000 },
        { month: "Feb", sales: 14800, target: 13500 },
        { month: "Mar", sales: 15600, target: 14000 },
        { month: "Apr", sales: 16500, target: 14500 },
        { month: "May", sales: 17400, target: 15000 },
        { month: "Jun", sales: 18200, target: 15500 },
        { month: "Jul", sales: 19000, target: 16000 },
        { month: "Aug", sales: 19800, target: 16500 },
        { month: "Sep", sales: 20500, target: 17000 },
        { month: "Oct", sales: 21200, target: 17500 },
        { month: "Nov", sales: 22000, target: 18000 },
        { month: "Dec", sales: 22800, target: 18500 },
      ]
    },
    { 
      name: "Gastrocare DS", 
      status: "underperforming", 
      change: "-5%", 
      insight: "Supply chain delays affecting stock availability in key territories",
      monthlyData: [
        { month: "Jan", sales: 7200, target: 7500 },
        { month: "Feb", sales: 7000, target: 7800 },
        { month: "Mar", sales: 6800, target: 8000 },
        { month: "Apr", sales: 6600, target: 8200 },
        { month: "May", sales: 6400, target: 8500 },
        { month: "Jun", sales: 6300, target: 8800 },
        { month: "Jul", sales: 6200, target: 9000 },
        { month: "Aug", sales: 6100, target: 9200 },
        { month: "Sep", sales: 6000, target: 9500 },
        { month: "Oct", sales: 5800, target: 9800 },
        { month: "Nov", sales: 5700, target: 10000 },
        { month: "Dec", sales: 5600, target: 10200 },
      ]
    },
  ];

  const recommendations = [
    {
      title: "Focus on Painrelief Plus Recovery",
      description: "Increase detailing frequency with orthopedic surgeons and pain management specialists. Highlight unique efficacy benefits vs competitors. Schedule CME programs in underperforming territories.",
      priority: "high"
    },
    {
      title: "Capitalize on Cardipro Momentum",
      description: "Expand Cardipro reach to general physicians in tier-2 cities. Current cardiologist adoption suggests high potential for primary care expansion.",
      priority: "medium"
    },
    {
      title: "Address Gastrocare Supply Chain",
      description: "Coordinate with supply chain to prioritize high-volume territories. Pre-communicate stock restoration timeline to top 50 prescribers to maintain relationship.",
      priority: "high"
    },
    {
      title: "Cross-Therapy Detailing",
      description: "Doctors prescribing Diabetrol XR show 65% receptivity to Cardipro. Create combo-detailing materials for diabetologists managing cardiovascular comorbidities.",
      priority: "medium"
    },
  ];

  if (selectedProduct) {
    const product = products.find(p => p.name === selectedProduct);
    if (product) {
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold">{product.name} - Monthly Performance</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
                  Back to Overview
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <Card className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={product.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      formatter={(value) => `₹${Number(value).toLocaleString()}`}
                      contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={3} name="Actual Sales" dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                    <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" name="Target" dot={{ fill: "#f59e0b", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3">Monthly Breakdown</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead className="text-right">Target</TableHead>
                      <TableHead className="text-right">Achievement</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.monthlyData.map((data) => (
                      <TableRow key={data.month}>
                        <TableCell className="font-medium">{data.month}</TableCell>
                        <TableCell className="text-right">₹{data.sales.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹{data.target.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <span className={data.sales >= data.target ? "text-success" : "text-destructive"}>
                            {((data.sales / data.target) * 100).toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Primary Sales Trend</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chart" className="mt-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="chart">Trend Chart</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4 mt-4">
            <Card className="p-4">
              <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      formatter={(value) => `₹${Number(value).toLocaleString()}`}
                      contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="2025" stroke="hsl(var(--primary))" strokeWidth={3} name="2025 (Current)" dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                    <Line type="monotone" dataKey="2024" stroke="#f59e0b" strokeWidth={3} name="2024 (Last Year)" strokeDasharray="5 5" dot={{ fill: "#f59e0b", r: 4 }} />
                  </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="table" className="mt-4">
            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">2025</TableHead>
                    <TableHead className="text-right">2024</TableHead>
                    <TableHead className="text-right">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell className="font-medium">{row.month}</TableCell>
                      <TableCell className="text-right">₹{row["2025"].toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{row["2024"].toLocaleString()}</TableCell>
                      <TableCell className="text-right text-success font-semibold">{row.growth}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Product Related Insights</h3>
          <div className="grid grid-cols-1 gap-3">
            {products.map((product) => (
              <Card 
                key={product.name} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedProduct(product.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      product.status === "performing" 
                        ? "bg-success/20" 
                        : "bg-destructive/20"
                    }`}>
                      {product.status === "performing" ? (
                        <TrendingUp className="w-5 h-5 text-success" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{product.name}</h4>
                        <span className={`text-sm font-semibold ${
                          product.status === "performing" ? "text-success" : "text-destructive"
                        }`}>
                          {product.change}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.insight}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Actionable Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <Card 
                key={index} 
                className={`p-4 border-l-4 ${
                  rec.priority === "high" 
                    ? "border-l-destructive bg-destructive/5" 
                    : "border-l-warning bg-warning/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    rec.priority === "high" 
                      ? "bg-destructive/20" 
                      : "bg-warning/20"
                  }`}>
                    {rec.priority === "high" ? (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    ) : (
                      <Lightbulb className="w-4 h-4 text-warning" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
