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
    { month: "Jan", "2025": 20000, "2024": 15000 },
    { month: "Feb", "2025": 45000, "2024": 35000 },
    { month: "Mar", "2025": 75000, "2024": 60000 },
    { month: "Apr", "2025": 100000, "2024": 85000 },
    { month: "May", "2025": 135000, "2024": 115000 },
    { month: "Jun", "2025": 165000, "2024": 145000 },
    { month: "Jul", "2025": 185000, "2024": 165000 },
    { month: "Aug", "2025": 200000, "2024": 180000 },
    { month: "Sep", "2025": 215000, "2024": 195000 },
    { month: "Oct", "2025": 230000, "2024": 205000 },
  ];

  const tableData = [
    { month: "January", "2025": 20000, "2024": 15000, growth: "+33.3%" },
    { month: "February", "2025": 45000, "2024": 35000, growth: "+28.6%" },
    { month: "March", "2025": 75000, "2024": 60000, growth: "+25.0%" },
    { month: "April", "2025": 100000, "2024": 85000, growth: "+17.6%" },
    { month: "May", "2025": 135000, "2024": 115000, growth: "+17.4%" },
    { month: "June", "2025": 165000, "2024": 145000, growth: "+13.8%" },
    { month: "July", "2025": 185000, "2024": 165000, growth: "+12.1%" },
    { month: "August", "2025": 200000, "2024": 180000, growth: "+11.1%" },
    { month: "September", "2025": 215000, "2024": 195000, growth: "+10.3%" },
    { month: "October", "2025": 230000, "2024": 205000, growth: "+12.2%" },
  ];

  const products = [
    { 
      name: "Aprox", 
      status: "performing", 
      change: "+18%", 
      insight: "Strong momentum with increasing prescription rates",
      monthlyData: [
        { month: "Jan", sales: 5000, target: 4500 },
        { month: "Feb", sales: 7500, target: 6000 },
        { month: "Mar", sales: 9200, target: 7500 },
        { month: "Apr", sales: 11000, target: 9000 },
      ]
    },
    { 
      name: "Bprox", 
      status: "performing", 
      change: "+12%", 
      insight: "Steady growth in tier-2 markets",
      monthlyData: [
        { month: "Jan", sales: 4200, target: 4000 },
        { month: "Feb", sales: 5800, target: 5500 },
        { month: "Mar", sales: 7100, target: 6800 },
        { month: "Apr", sales: 8500, target: 8000 },
      ]
    },
    { 
      name: "Cprox", 
      status: "underperforming", 
      change: "-5%", 
      insight: "Declining engagement - competitor activity increased",
      monthlyData: [
        { month: "Jan", sales: 6000, target: 6500 },
        { month: "Feb", sales: 5500, target: 6800 },
        { month: "Mar", sales: 5200, target: 7000 },
        { month: "Apr", sales: 4800, target: 7200 },
      ]
    },
    { 
      name: "Dprox", 
      status: "performing", 
      change: "+8%", 
      insight: "Consistent performance in key accounts",
      monthlyData: [
        { month: "Jan", sales: 3500, target: 3200 },
        { month: "Feb", sales: 4200, target: 3800 },
        { month: "Mar", sales: 5000, target: 4500 },
        { month: "Apr", sales: 5800, target: 5200 },
      ]
    },
    { 
      name: "Eprox", 
      status: "underperforming", 
      change: "-3%", 
      insight: "Supply chain issues affecting availability",
      monthlyData: [
        { month: "Jan", sales: 2800, target: 3000 },
        { month: "Feb", sales: 2600, target: 3200 },
        { month: "Mar", sales: 2400, target: 3400 },
        { month: "Apr", sales: 2200, target: 3500 },
      ]
    },
  ];

  const recommendations = [
    {
      title: "Focus on Cprox Recovery",
      description: "Increase detailing frequency for Cprox with A-segment doctors. Schedule promotional events in underperforming territories.",
      priority: "high"
    },
    {
      title: "Capitalize on Aprox Momentum",
      description: "Expand Aprox reach to B-segment doctors. Current adoption rate suggests high potential for market expansion.",
      priority: "medium"
    },
    {
      title: "Address Eprox Supply Issues",
      description: "Coordinate with supply chain team to resolve stock availability. Communicate expected timelines to key prescribers.",
      priority: "high"
    },
    {
      title: "Cross-Sell Opportunities",
      description: "Doctors prescribing Aprox show high receptivity to Bprox. Bundle promotional materials for combo detailing.",
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual Sales" />
                    <Line type="monotone" dataKey="target" stroke="hsl(var(--warning))" strokeWidth={2} strokeDasharray="5 5" name="Target" />
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
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="2025" stroke="hsl(var(--primary))" strokeWidth={3} name="2025" />
                  <Line type="monotone" dataKey="2024" stroke="hsl(var(--warning))" strokeWidth={3} name="2024" />
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
